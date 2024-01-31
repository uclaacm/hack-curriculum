import { useEffect, useState } from 'react';
import '../App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Workshop from './Workshop';

const CONTENT_SERVER = 'http://localhost:8080';

interface WorkshopType {
  title: string;
  outline: string;
}

function App() {
  const [workshops, setWorkshops] = useState<WorkshopType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${CONTENT_SERVER}/workshop-list`);
      const workshopTitles = await response.json();
      
      const workshops = await Promise.all(
        workshopTitles.map(async (title: string) => {
          const response = await fetch(`${CONTENT_SERVER}/workshops/${title}/outline.yml`);
          const outline = await response.text();

          console.log(outline);

          return { title, outline };
        })
      );

      setWorkshops(workshops);
    };
    fetchData();
  }, []);

  return (
    <>
      {workshops.map((workshop: WorkshopType, i: number) => (
        <Workshop
          key={i}
          title={workshop.title}
          outline={workshop.outline}
        />
      ))}
    </>
  );
}

export default App;
