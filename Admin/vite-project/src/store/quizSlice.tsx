import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface QuizState {
    quiz: [{

        name: string
        startTime: Date,
        duration: number,
        category: string
    }] | []
}

const initialState: QuizState = {
    quiz: [],
}

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuizList: (state, action) => {
            state.quiz = action.payload;
        }
    },
})

export const { setQuizList } = quizSlice.actions

export const getQuizList = () => async (dispatch: any) => {
    try {
        const response = await axios.get("http://localhost:5000/api/v1/Quiz/list", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')!}`
            }
        });
        console.log("API Response:", response.data); 
        if (response.data.status) {
            dispatch(setQuizList(response.data.data))
        }
    } catch (err: any) {
        return { status: true, message: err.response.data.message }
    }
}

export const createQuiz = (data: { name: string, startTime: Date, duration: number, category: string }) => async (dispatch: any) => {
    try {
        const response = await axios.post("http://localhost:5000/api/v1/Quiz/create", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')!}`
            }
        });
        
        if (response.data.status) {
            dispatch(getQuizList())
        }
    } catch (err: any) {
        return { status: true, message: err.response.data.message }
    }
}
 export const DeleteQuiz =(id: string) => async (dispatch: any) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/v1/Quiz/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')!}`
            }
        });
        
        if (response.data.status) {
            dispatch(getQuizList())
        }
    } catch (err: any) {
        return { status: true, message: err.response.data.message }
    }
}
export const updateQuiz = (id: string, formData: any) => async (dispatch: any) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/v1/Quiz/update/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')!}`
            }
        });
        
        if (response.data.status) {
            dispatch(getQuizList())
        }
    } catch (err: any) {
        return { status: true, message: err.response.data.message }
    }
}



export default quizSlice.reducer