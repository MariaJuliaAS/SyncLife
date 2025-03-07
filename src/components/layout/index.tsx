import { Outlet, useLocation } from "react-router-dom";
import { NavMenu } from "../nav";

export function Layout() {
    const location = useLocation();

    const isPageLogin = location.pathname === '/'

    return (
        <>
            {!isPageLogin && <NavMenu />}
            <Outlet />
        </>
    )
}