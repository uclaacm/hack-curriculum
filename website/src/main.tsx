import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
// import Home from './pages/Home.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import App, { rootLoader } from './App.tsx';
import Workshop, { workshopLoader, workshopAction } from './pages/Workshop.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    loader: rootLoader,
  },
  {
    path: "/workshops/:workshop",
    element: <Workshop title="workshop" outline="" />,
    loader: workshopLoader,
    // action: workshopAction,
  }
]);

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not found");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);