

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Network, Target, LogOut } from "lucide-react";

const SideBar = () => {
    const user: any = useSelector((state: RootState) => state.user.user);
    const navigate = useNavigate();
    const location = useLocation();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="w-2/12 bg-gradient-to-b from-white to-gray-100 text-gray-800 h-screen flex flex-col justify-between p-4 shadow-md border-r border-gray-200">
            <div className="flex items-center mb-6">
                <Avatar className="mr-4">
                    <AvatarFallback className="bg-gray-300 text-gray-800 text-xl font-bold uppercase">
                        {user?.name?.slice(0, 2)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-lg font-semibold">{user?.name}</h2>
                    <span className="text-sm text-gray-500">{user?.role}</span>
                </div>
            </div>

            <nav className="flex flex-col gap-2 mt-2 mb-auto">
                <Link
                    to="/users"
                    className={`flex items-center py-3 px-5 rounded-md transition ${
                        isActive("/users")
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "hover:bg-blue-50 hover:text-blue-700"
                    }`}
                >
                    <Users className="mr-3" />
                    Users
                </Link>
                <Link
                    to="/quiz"
                    className={`flex items-center py-3 px-5 rounded-md transition ${
                        isActive("/quiz")
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "hover:bg-blue-50 hover:text-blue-700"
                    }`}
                >
                    <Network className="mr-3" />
                    Quiz
                </Link>
                <Link
                    to="/question"
                    className={`flex items-center py-3 px-5 rounded-md transition ${
                        isActive("/question")
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "hover:bg-blue-50 hover:text-blue-700"
                    }`}
                >
                    <Target className="mr-3" />
                    Questions
                </Link>
            </nav>

            <Button
                variant="destructive"
                onClick={logoutHandler}
                className="mt-6 bg-red-500 hover:bg-red-600 w-full flex items-center justify-center py-3 text-white"
            >
                <LogOut className="mr-3" />
                Logout
            </Button>
        </div>
    );
};

export default SideBar;