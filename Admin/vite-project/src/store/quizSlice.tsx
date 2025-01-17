import { createSlice } from '@reduxjs/toolkit'

export interface QuizState {
    quiz: unknown
}

const initialState: QuizState = {
    quiz: {},
}

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {

    },
})

export const { } = quizSlice.actions

export default quizSlice.reducer