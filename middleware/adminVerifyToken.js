import jwt from 'jsonwebtoken';

export const adminVerification = (req, res, next) => {
    try {

        if (req.body.role === 'User') {
            next()
        } else {
            const token = req.headers.authorization.split(' ')[1];

            const data = jwt.verify(token, 'quiz');
            if (data.role === 'Admin') {
                next()
            } else {
                return res.status(403).json({
                    message: 'Unauthorized Access',
                    status: false,
                    data: null
                })
            }
        }
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid Token',
            status: false,
            data: null
        })
    }
}