import {
  Link,
  useLoaderData
} from 'react-router-dom';
import { CONTENT_SERVER } from './constants.tsx';
import './App.css';

export const rootLoader = async () => {
  const response = await fetch(`${CONTENT_SERVER}/workshop-list`);
  const workshopTitles = await response.json();

  return { workshopTitles };
};

export default function App() {
  const { workshopTitles } = useLoaderData();

  return (
    <>
      <nav>
        <ul>
          {workshopTitles.map((workshop: any, i: number) => (
            <li key={i}>
              <Link to={`/workshops/${workshop}`}>{workshop}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}