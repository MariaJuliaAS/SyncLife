import { createBrowserRouter } from "react-router-dom";
import { Agenda } from './pages/agenda';
import { Finances } from './pages/finances';
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Account } from "./pages/account";
import { Layout } from "./components/layout";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Login />
            },
            {
                path: '/cadastro',
                element: <Register />
            },
            {
                path: '/agenda',
                element: <Agenda />
            },
            {
                path: '/financas',
                element: <Finances />
            },
            {
                path: '/conta',
                element: <Account />
            }
        ]
    }
]);


export { router };