import { useEffect, useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import quiz from '@/assets/quiz.jpg';
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [value, setValue] = useState({
        email: "rutvijogani@gmail.com",
        password: "1",
    });
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/user');
        }
    }, [navigate])

    const inputHandler = (e: any) => {
        const { name, value } = e.target;
        setValue((prev) => ({ ...prev, [name]: value }));
        
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const submit = async () => {
        const res = await dispatch(loginUser(value, navigate));
        if (res.status) {
            setMessage(res.message);
            setTimeout(() => {
                setMessage("");
            }, 4000);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col md:flex-row justify-center items-center bg-gray-100 p-4">
            <div className="hidden md:flex flex-col justify-center items-center p-8 w-1/2 h-full">
                <h2 className="text-3xl font-bold mb-4">Welcome to Admin Panel</h2>
                <img src={quiz} alt="Quiz Management" className="mb-4 max-w-full h-auto" />
                <p className="text-lg text-center">Manage quizzes, track performance, and access powerful tools for efficient administration.</p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full md:w-1/2 flex flex-col items-center gap-5">
                <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
                <Input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="w-full"
                    value={value.email}
                    onChange={inputHandler}
                />
                <div className="relative w-full">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        className="w-full"
                        value={value.password}
                        onChange={inputHandler}
                    />
                    <Button
                        variant="link"
                        size="icon"
                        onClick={togglePasswordVisibility}
                        className="absolute right-0 top-0"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                </div>
                <Button
                    onClick={submit}
                    className="w-full"
                >
                    Login
                </Button>
            </div>

            {message !== "" && (
                <Alert
                    variant="destructive"
                    className="absolute bottom-10 left-10 max-w-sm w-full shadow-lg"
                >
                    <AlertCircle className="h-5 w-5" />
                    <div className="flex flex-col">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{message}</AlertDescription>
                    </div>
                </Alert>
            )}
        </div>
    );
};

export default Login;