import { AppError } from "../utils/AppError.js"


function allowedTo(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new AppError('you are not allaowed', 401))
        next()
    }
}

export default allowedTo