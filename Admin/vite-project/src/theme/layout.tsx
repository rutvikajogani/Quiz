import { Outlet } from "react-router-dom";
import SideBar from "./sidebar";

const Layout = () => {
    return (
        <div className="flex">
            <SideBar />

            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;