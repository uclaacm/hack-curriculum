import React, { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { CONTENT_SERVER } from '../constants.tsx';

//TODO: navigation butons (next and prev)

interface Props { }

interface Params {
    workshop: string;
}

interface Workshop {
    title: string;
    modules: string[];
}

export const workshopSeriesLoader = async ({ params }: LoaderFunctionArgs<Params>) => {
    const response = await fetch(`${CONTENT_SERVER}/workshops/${params.workshop}/outline.yml`);
    const outline = await response.text();

    return { title: params.workshop, outline };
};

//plan: 
// - initially load just first workshop modules
// - make a function to load workshop index modules
// - display current workshop index modules
const loadWorkshop = async (workshops: Workshop[], workshopIndex: number) => {
    if (workshopIndex >= workshops.length) throw new Error("Workshop index out of range");

    const workshop = workshops[workshopIndex];
    let result = `# ${workshop.title}\n`;
    for (const module of workshop.modules) {
        const response = await fetch(`http://localhost:8080/${module}/README.md`);
        let moduleText = await response.text();
        moduleText = moduleText.replace(/# /g, "## ") + "\n"; // make headers smaller
        result += moduleText;
    }
    return result;
}

const WorkshopSeries: React.FC<Props> = () => {
    const [modules, setModules] = useState<string>("");
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [currentWorkshopIndex, setCurrentWorkshopIndex] = useState<number>(0); 
    const { title, outline } = useLoaderData() as { title: string, outline: string };

    const loadWorkshops = async () => {
        const workshops = yaml.load(outline) as Workshop[];
        const modules = await loadWorkshop(workshops, 0);
        setWorkshops(workshops);
        setModules(modules);
    }

    const load = async (workshops: Workshop[], workshopIndex: number) => {
        const modules = await loadWorkshop(workshops, workshopIndex);
        setModules(modules);
        setCurrentWorkshopIndex(workshopIndex);
    }

    useEffect(() => {
        loadWorkshops();
    }, [outline]);

    return (
        <div id="workshop-content">
            <div>{title}</div>
            {workshops.map((workshop: Workshop, i: number) =>
                <li key={i} onClick={() => load(workshops, i)}>
                    {workshop.title}
                </li>
            )}
            <Markdown remarkPlugins={[remarkGfm]}>{modules}</Markdown>
            { currentWorkshopIndex > 0 ? <button onClick={() => load(workshops, currentWorkshopIndex - 1)}>Previous</button> : null}
            { currentWorkshopIndex < workshops.length - 1 ? <button onClick={() => load(workshops, currentWorkshopIndex + 1)}>Next</button> : null}
        </div>
    );
};

export default WorkshopSeries;
