import React, { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import Markdown from 'react-markdown'

interface Props {
    title: string;
    outline: string;
}

const Workshop: React.FC<Props> = (props) => {
    const [modules, setModules] = useState("");

    const loadModules = async (outline: string) => {
        let result = "";
    
        const workshops = yaml.load(outline);
    
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
        loadModules(props.outline);
    }, []);

    return (
        <div>
            <h1>{props.title}</h1>
            <Markdown>{modules}</Markdown>
        </div>
    );
};

export default Workshop;
