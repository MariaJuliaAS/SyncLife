import { Outlet } from "react-router-dom";
import { NavMenu } from "../nav";


export function Layout() {

    return (
        <>
            <NavMenu />
            <Outlet />
        </>
    )
}