import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddProduct from './Componets/AddProduct.jsx';
import Home from './Componets/Home.jsx';
import Login from './Componets/Login.jsx';
import MainLayOut from './Componets/MainLayOut.jsx';
import Register from './Componets/Register.jsx';
import UpdateProduct from './Componets/UpdateProduct.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    loader: ()=> fetch('https://tech-mart-server-delta.vercel.app/product'),
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch('https://tech-mart-server-delta.vercel.app/product')
      },
      {
        path: "/addproduct",
        element: <AddProduct></AddProduct>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/update/:id",
        element: <UpdateProduct></UpdateProduct>,
        loader: ({params})=> fetch(`https://tech-mart-server-delta.vercel.app/product/${params.id}`)
      },
      {
        path: "/login",
        element: <Login></Login>
      },
    ]
  },
], {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
    v7_startTransition: true,
  }
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
