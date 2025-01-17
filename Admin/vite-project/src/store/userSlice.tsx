import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export interface UserState {
    user: unknown
}

interface loginUser {
    email: string
    password: string
}

const initialState: UserState = {
    user: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
})

export const { setUser } = userSlice.actions

export const loginUser = (data: loginUser, navigate: Function) => async (dispatch: any) => {
    try {
        const response = await axios.post("http://localhost:5000/api/v1/user/login", data);
        if (response.data.status) {
            const decoded: any = jwtDecode(response.data.data);
            if (decoded.role === 'Admin') {
                localStorage.setItem('token', response.data.data);
                dispatch(setUser(decoded))
                navigate('/user')
                return { status: false, message: "Login successful" }
            } else {
                return { status: true, message: "Invalid credentials" }
            }
        }
    } catch (err: any) {
        return { status: true, message: err.response.data.message }
    }

}

export default userSlice.reducer