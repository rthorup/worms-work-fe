import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from './components/ErrorPage';
import { UrlContext } from './context/urlContext';
import { AddBucket, AddClient, AssignBucket, Home, Transactions} from "./components/index";
import {createHashRouter, RouterProvider} from "react-router-dom"
import reportWebVitals from './reportWebVitals';



const url = "https://worms-work-be.onrender.com";
// const url = "http://localhost:3003";
const router = createHashRouter([
  {
  path: "/",
  element: <Home />,
  errorElement: <ErrorPage />
  },
  {
    path: "/add-client", 
    element:<AddClient />,
    errorElement: <ErrorPage />
  },
  {
    path: "/assign-bucket/:id",
    element: <AssignBucket />,
    errorElement: <ErrorPage />
  },
  {
    path: "/add-bucket", 
    element: <AddBucket />,
    errorElement: <ErrorPage />
  },
  {
    path: "/transactions", 
    element: <Transactions />,
    errorElement: <ErrorPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <UrlContext.Provider value={url}>
        <React.StrictMode>
          <RouterProvider router={router}/>
       </React.StrictMode>
     </UrlContext.Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
