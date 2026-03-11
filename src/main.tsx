import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateBlog from './pages/Createblog';
import BlogDetail from './pages/BlogDetail';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/create",
    element: <CreateBlog/>,
  },
  {
    path: "/blog/:id",
    element: <BlogDetail/>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />,
  </StrictMode>,
)
