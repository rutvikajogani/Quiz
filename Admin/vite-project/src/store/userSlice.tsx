    import { createSlice } from '@reduxjs/toolkit'
    import axios from 'axios'
    import { jwtDecode } from 'jwt-decode'

    export interface UserState {
        user: unknown
        users: [{
            name: string,
            email: string,
        }] | []
    }

    interface loginUser {
        email: string
        password: string
    }

    const initialState: UserState = {
        user: {},
        users: []
    }

    export const userSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {
            setUser: (state, action) => {
                state.user = action.payload;
            },
            setUserList: (state, action) => {
                state.users = action.payload;
            },
          
        
            
        },
    })

    export const { setUser, setUserList } = userSlice.actions

    export const loginUser = (data: loginUser, navigate: Function) => async (dispatch: any) => {
        try {
            const response = await axios.post("http://localhost:5000/api/v1/user/login", data);
            if (response.data.status) {
                const decoded: any = jwtDecode(response.data.data);
                if (decoded.role === 'Admin') {
                    localStorage.setItem('token', response.data.data);
                    dispatch(setUser(decoded))
                    navigate('/users')
                    return { status: false, message: "Login successful" }
                } else {
                    return { status: true, message: "Invalid credentials" }
                }
            }
        } catch (err: any) {
            return { status: true, message: err.response.data.message }
        }

    }

    export const getUserList = () => async (dispatch: any) => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/user/list", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')!}`
                }
            });
            if (response.data.status) {
                dispatch(setUserList(response.data.data))
            }
        } catch (err: any) {
            return { status: true, message: err.response.data.message }
        }
    }

    export const createAdmin = (data: { name: string, email: string, password: string, role: string }) => async (dispatch: any) => {
        try {
            const response = await axios.post("http://localhost:5000/api/v1/user/create", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')!}`
                }
            });
            if (response.data.status) {
                dispatch(getUserList())
            }
        } catch (err: any) {
            return { status: true, message: err.response.data.message }
        }
    }

    export const toggleUser = (id: string, value: boolean) => async (dispatch: any) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/v1/user/ban/${id}`, { ban: value }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')!}`
                }
            });
            if (response.data.status) {
                dispatch(getUserList())
            }
        } catch (err: any) {
            return { status: true, message: err.response.data.message }
        }
    }

    export const DeleteUser = (id: string) => async (dispatch: any) =>{
        try {
            const response = await axios.delete(`http://localhost:5000/api/v1/user/Delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')!}`
                }
            });
            if (response.data.status) {
                dispatch(getUserList())
            }
        } catch (err: any) {
            return { status: true, message: err.response.data.message }
        }
    }
    export const updateUser = (id: string, formData: any) => async (dispatch: any) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/v1/user/update/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      dispatch(getUserList()); // Refresh the user list after update
    }
  } catch (err: any) {
    console.error("Error updating user:", err);
  }
};



    export default userSlice.reducer