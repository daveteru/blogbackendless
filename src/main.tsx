import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { authLoader } from "./loaders/auth";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/Createblog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create",
    element: <CreateBlog />,
    loader: authLoader,
  },
  {
    path: "/blog/:objectId",
    element: <BlogDetail />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />,
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
);
