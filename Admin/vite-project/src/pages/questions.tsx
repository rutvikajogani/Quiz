import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, DeleteQuestion } from '@/store/questionSlice';
import { Button } from "@/components/ui/button";

export const Question = () => {
    const dispatch: any = useDispatch();
    const questions = useSelector((state: any) => state.question.questions);

    useEffect(() => {
        dispatch(fetchQuestions()); // Fetch questions on component load
    }, [dispatch]);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Add state for Edit Dialog
    const [userId, setUserId] = useState<string | null>(null);

    const handleDelete = (questionId: string) => {
        setIsDeleteDialogOpen(true);
        setUserId(questionId);
    };

    const handleConfirmDelete = () => {
        if (userId) {
            console.log('Confirm delete for question ID:', userId); // Verify ID
            dispatch(DeleteQuestion(userId)); // Dispatch delete action
            dispatch(fetchQuestions()); // Refetch questions after deletion
            setIsDeleteDialogOpen(false); // Close the delete dialog
        }
    };

    const handleEdit = (questionId: string) => {
        setIsEditDialogOpen(true);
        setUserId(questionId);
    };

    return (
        <div className="p-8 space-y-4">
            <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Questions</h1>
            <div className="flex flex-col gap-5">
                {questions.map((question: any, index: number) => (
                    <div key={index} className="p-4 border rounded shadow">
                        <h2 className="text-xl font-medium">{question.title}</h2>

                        {/* Display only the correct option */}
                        {question.options
                            .filter((option: any) => option.isCorrect) // Filter correct option
                            .map((correctOption: any, optIndex: number) => (
                                <p key={optIndex} className="text-green-600 font-bold">
                                    Correct Answer: {correctOption.title}
                                </p>
                            ))}
                        
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => handleEdit(question.id)}>
                                Edit
                            </Button>
                            <Button onClick={() => handleDelete(question._id)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {isDeleteDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">Delete Question</h2>
                        <p className="mb-4">Are you sure you want to delete this question?</p>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleConfirmDelete}>
                                Confirm Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
