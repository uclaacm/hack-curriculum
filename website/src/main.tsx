import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from './pages/ErrorPage.tsx';
import App, { rootLoader } from './App.tsx';
import WorkshopSeries, { workshopSeriesLoader } from './pages/WorkshopSeries.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    loader: rootLoader,
  },
  {
    path: "/workshops/:workshop",
    element: <WorkshopSeries />,
    loader: workshopSeriesLoader,
  }
]);

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not found");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);