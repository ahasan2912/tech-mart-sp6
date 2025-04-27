import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import AddCart from './Componets/AddCart.jsx';
import AddProduct from './Componets/AddProduct.jsx';
import Admin from './Componets/Admin.jsx';
import Home from './Componets/Home.jsx';
import Login from './Componets/Login.jsx';
import MainLayOut from './Componets/MainLayOut.jsx';
import OrderList from './Componets/OrderList.jsx';
import Register from './Componets/Register.jsx';
import UpdateProduct from './Componets/UpdateProduct.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import PaymentSuccess from './Componets/PaymentSuccess.jsx';
import PaymentFaild from './Componets/PaymentFaild.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    loader: ()=> fetch('http://localhost:5000/product'),
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch('http://localhost:5000/product')
      },
      {
        path: "/admin",
        element: <Admin></Admin>,
        loader: () => fetch('http://localhost:5000/product')
      },
      {
        path: "/addproduct",
        element: <AddProduct></AddProduct>
      },
      {
        path: "/addcart/:id",
        element: <AddCart></AddCart>
      },
      {
        path: "/orderList",
        element: <OrderList></OrderList>,
        loader: () => fetch('http://localhost:5000/order')
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/update/:id",
        element: <UpdateProduct></UpdateProduct>,
        loader: ({params})=> fetch(`http://localhost:5000/product/${params.id}`)
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/payment/success/:tranId",
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: "/payment/fail/:tranId",
        element: <PaymentFaild></PaymentFaild>
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
