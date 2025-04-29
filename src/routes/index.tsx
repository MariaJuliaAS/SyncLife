import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/home";
import { Finances } from "../pages/finances";
import { Login } from '../pages/login';
import { Register } from "../pages/register";
import { Private } from "./private";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Private>  <Home /> </Private>
    },
    {
        path: '/finances',
        element: <Private><Finances /></Private>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
])