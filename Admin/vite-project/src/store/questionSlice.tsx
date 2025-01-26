import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the Option interface
export interface Option {
    id: string;
    text: string;
    isCorrect: boolean;
}

// Define the Question interface
export interface Question {
    quizId: string;
    title: string;
    type: string; // MCQ, True/False, etc.
    options: Option[];
    time: number; // Time in seconds
    point: number; // Points awarded
   
}

// Define the Redux state interface
export interface QuestionState {
    questions: Question[]; // Array of questions
}

const initialState: QuestionState = {
    questions: [], // Initially no questions
};

// Define the slice
export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            console.log("Updating state with questions:", action.payload); 
            state.questions = action.payload; // Set the questions in the state
        },
    },
});

// Export the action for use in your components
export const { setQuestions } = questionSlice.actions;

// Fetch questions based on quizId
export const fetchQuestions = (quizId: string) => async (dispatch: any) => {
    try {
        const response = await axios.get("http://localhost:5000/api/v1/Question/list", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')!}` // If needed
            }
        });

        // Log the API response to check the data
        console.log("API Response:", response.data);

        if (response.data.status) {
            dispatch(setQuestions(response.data.data))
        }
    } catch (err: any) {
        console.error("Failed to fetch questions", err);
    }
};


// Export the reducer to be used in the store
export default questionSlice.reducer;
