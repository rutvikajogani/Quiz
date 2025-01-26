import { setUser } from "@/store/userSlice";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"

const Auth = (props: any) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        } else {
            const decoded: any = jwtDecode(localStorage.getItem('token')!);
            dispatch(setUser(decoded))
        }
    }, [navigate])

    return <>{props.children}</>
}

export default Auth