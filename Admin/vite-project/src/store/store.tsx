import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import quizReducer from './quizSlice';
import questionReducer from './questionSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        quiz: quizReducer,
        question: questionReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch