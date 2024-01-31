import React, { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import Markdown from 'react-markdown'
import { useLoaderData, redirect } from 'react-router-dom';
import { CONTENT_SERVER } from '../constants.tsx';

// export const workshopAction = async ({ request, params }) => {
//     return redirect(`/workshops/${params.workshop}`);
// }

export const workshopLoader = async ({ params }) => {
    const response = await fetch(`${CONTENT_SERVER}/workshops/${params.workshop}/outline.yml`);
    const outline = await response.text();

    return { title: params.workshop, outline };
};

//TODO: fetch a single workshop using param from the URL
const Workshop: React.FC<Props> = (props) => {
    const [modules, setModules] = useState("");
    const { title, outline } = useLoaderData() as { title: string, outline: string };

    const loadModules = async () => {
        let result = "";

        const workshops = yaml.load(outline) as string[][];

        for (const workshop of workshops) {
            for (const module of workshop) {
                const response = await fetch(`http://localhost:8080/${module}/README.md`);
                const moduleText = await response.text();
                result += moduleText + "\n";
            }
        }
        setModules(result);
    }

    useEffect(() => {
        loadModules();
    }, []);

    return (
        <div>
            <h1>{title}</h1>
            <Markdown>{modules}</Markdown>
        </div>
    );
};

export default Workshop;
