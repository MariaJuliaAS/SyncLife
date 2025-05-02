import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/home";
import { Finances } from "../pages/finances";
import { Login } from '../pages/login';
import { Register } from "../pages/register";
import { Private } from "./private";
import { Activities } from "../pages/activities";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Private><Home /></Private>
    },
    {
        path: '/finances',
        element: <Private><Finances /></Private>
    },
    {
        path: '/activities',
        element: <Private><Activities /></Private>
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