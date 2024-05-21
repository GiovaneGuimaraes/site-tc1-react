import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './routes/Home';
import './styles.css'
import Cadastrar from './routes/Cadastrar';
import Editar from './routes/Editar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/cadastro",
    element: <Cadastrar/>
  },
  {
    path: "/editar/:index",
    element: <Editar/>
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
