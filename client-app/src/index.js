import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Homepage from './Homepage';
import Register, { loader as registerLoader } from './Register';
import Login, { loader as loginLoader } from './Login';
import Logout, { loader as logoutLoader } from './Logout';
import Dashboard, { loader as dashboardLoader } from './Dashboard';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      {
        path: "register",
        element: <Register />,
        loader: registerLoader,
      },
      {
        path: "login",
        element: <Login />,
        loader: loginLoader,
      },
      {
        path: "logout",
        element: <Logout />,
        loader: logoutLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
