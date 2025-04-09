import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/home";
import { Finances } from "../pages/finances";
import { Login } from "../pages/login";
import { Register } from "../pages/register";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/finances',
        element: <Finances />
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