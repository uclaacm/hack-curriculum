import React, { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { CONTENT_SERVER } from '../constants.tsx';

//TODO: separate pages for each workshop within series
//TODO: table of contents with links to workshops
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

const WorkshopSeries: React.FC<Props> = () => {
    const [modules, setModules] = useState<string[]>([]);
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const { title, outline } = useLoaderData() as { title: string, outline: string };

    useEffect(() => {
        const loadModules = async () => {
            setModules([])
            const workshops = yaml.load(outline) as Workshop[];
            setWorkshops(workshops);

            const moduleTexts: string[] = [];
            for (const workshop of workshops) {
                let result = `# ${workshop.title}\n`;
                for (const module of workshop.modules) {
                    const response = await fetch(`http://localhost:8080/${module}/README.md`);
                    let moduleText = await response.text();
                    moduleText = moduleText.replace(/# /g, "## ") + "\n"; // make headers smaller
                    result += moduleText;
                }
                moduleTexts.push(result);
            }
            setModules(moduleTexts);
        }
        loadModules();
    }, [outline]);

    return (
        <div id="workshop-content">
            <div>{title}</div>
            {workshops.map((workshop: Workshop, i: number) =>
                <li key={i}>
                    {workshop.title}
                </li>
            )}
            {modules.map((module: string, i: number) =>
                <div key={i}>
                    <Markdown remarkPlugins={[remarkGfm]}>{module}</Markdown>
                    <hr />
                </div>
            )}
        </div>
    );
};

export default WorkshopSeries;
