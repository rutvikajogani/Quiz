import quizModel from "../models/quizModel.js"


export const allQuizList = async (req, res) => {
    try {
     
        const quizzes = await quizModel.find();

 
       return  res.status(200).json({
            message: "Quizzes fetched successfully.",
            status: true,
            data: quizzes
        });

    } catch (err) {
        console.error(err); 
        res.status(500).json({
            message: 'Internal Server Error',
            status: false,
            data: null
        });
    }
}


export const singleQuizList = async (req, res) => {
    
    try{
        const { id } = req.params; 

   
        const quiz = await quizModel.findById(id);
        
        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found.",
                status: false,
                data: null
            });
        }
    
        
       return res.status(200).json({
            message: "Quiz fetched successfully.",
            status: true,
            data: quiz
        });
    }catch(err){
        res.status(500).json({
            message: 'Internal Server Error',
            status: false,
            data: null
        })
    
    }
}

export const createQuiz = async (req, res) => {
    try{
        const { name, startTime, duration, category } = req.body;

       
        if (!name || !startTime || !duration || !category) {
            return res.status(400).json({
                message: "All fields are required.",
                status: false,
                data: null
            });
        }
      
        const newQuiz =  await quizModel.create({
            ...req.body, startTime: new Date(startTime).toISOString() });
       
      return  res.status(201).json({
            message: "Quiz created successfully.",
            status: true,
            data: newQuiz
        });



    }catch(err){
        res.status(500).json({
            message: 'Internal Server Error',
            status: false,
            data: null
        })
    
    }
}

export const updateQuiz = async (req, res) => {
    try {
        const id = req.params.id;

        const quiz = await quizModel.findById(id);
        if (!quiz) {
            return res.status(404).json({
                message: 'Quiz not found..!',
                status: false,
                data: null
            })
        }

        for (const key in req.body) {
            quiz[key] = req.body[key]
        }

        await quiz.save();

        return res.json({
            message: "Quiz updated",
            data: quiz,
            status: true
        })

    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            status: false,
            data: null
        })

    }
}

export const deleteQuiz = async (req, res) => {
    try {
       const id=req.params.id;

        
        const quiz = await quizModel.findByIdAndDelete(id);
        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found.",
                status: false,
                data: null
            });
        }

       
       return  res.status(200).json({
            message: "Quiz deleted successfully.",
            status: true,
            data: null
        });

    } catch (err) {
        console.error(err);  
        res.status(500).json({
            message: 'Internal Server Error',
            status: false,
            data: null
        });
    }
}
