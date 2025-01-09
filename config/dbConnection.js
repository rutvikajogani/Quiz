import mongoose from "mongoose";


export const dbConnection =() => {
    const url = 'mongodb://localhost:27017/quiz'

    mongoose.connect(url).then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err);
    })
    



}