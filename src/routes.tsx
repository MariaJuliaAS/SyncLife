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
                element: (
                    <CheckLogged>
                        <Login />
                    </CheckLogged>
                )
            },
            {
                path: '/cadastro',
                element: <Register />
            },
            {
                path: '/agenda',
                element: (
                    <CheckLogged>
                        <Agenda />
                    </CheckLogged>
                )
            },
            {
                path: '/financas',
                element: (
                    <CheckLogged>
                        <Financas />
                    </CheckLogged>
                )
            }
        ]
    }
]);


export { router };