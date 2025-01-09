export const  createQuestion =  (req,res) => {
    try{
      const { title,type,options,time,point,quizId } = req.body;

    }
    catch(e){
        res.status(500).json({
            message: e.message,
            status: false,
            data: null
        })
    }
}

