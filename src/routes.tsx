import { createBrowserRouter } from "react-router-dom";
import { Agenda } from './pages/agenda';
import { Financas } from './pages/financas';
import { PagInicial } from "./pages/inicial";
import { Layout } from "./components/layout";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <PagInicial />
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