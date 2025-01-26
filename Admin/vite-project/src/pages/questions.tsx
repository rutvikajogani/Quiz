import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '@/store/questionSlice'; // Correct path to your slice
import { RootState } from '@/store/store'; // Assuming you have a RootState type for the store

export const Question = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state: RootState) => state.question.questions);

    useEffect(() => {
        dispatch(fetchQuestions()); // Pass the quizId correctly
    }, [dispatch]);

    console.log("Questions from Redux:", questions); // Log questions for debugging

    const handleEdit = (id: string) => {
        console.log("Edit button clicked for question:", id);
        // Add your edit logic here
    };

    const handleDelete = (id: string) => {
        console.log("Delete button clicked for question:", id);
        // Add your delete logic here
    };

    return (
        <div className="p-8 space-y-4">
            <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Questions</h1>
            {questions.map((question, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
                >
                    <div className="flex justify-between">
                        <h2 className="text-xl font-bold text-gray-800">{question.title}</h2>
                        <p className="text-sm text-gray-600">Type: {question.type}</p>
                    </div>

                    <div className="space-y-2">
                        {question.options && question.options.length > 0 ? (
                            question.options.map((option) => (
                                <div
                                    key={option._id}
                                    className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200"
                                >
                                    <input
                                        type="radio"
                                        name={`question-${index}`} // Ensure unique name for each question
                                        value={option._id} // Use option._id as the value
                                        className="h-5 w-5 text-blue-600"
                                    />
                                    <label className="text-sm text-gray-700">{option.title}</label>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-red-500">No options available</p> // Fallback if no options
                        )}
                    </div>

                    <div className="flex justify-between mt-4">
                        <p className="text-sm text-gray-600">Time: {question.time} seconds</p>
                        <p className="text-sm text-gray-600">Points: {question.point}</p>
                    </div>

                    {/* Edit and Delete Buttons */}
                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            onClick={() => handleEdit(question._id)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded-lg text-sm shadow"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(question._id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg text-sm shadow"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
