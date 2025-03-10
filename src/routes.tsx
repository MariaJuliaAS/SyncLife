import { createBrowserRouter } from "react-router-dom";
import { Agenda } from './pages/agenda';
import { Financas } from './pages/financas';
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Layout } from "./components/layout";
import CheckLogged from "./utils/checkLogged";

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
                element: <Financas />
            }
        ]
    }
]);


export { router };