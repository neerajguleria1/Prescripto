import jwt from 'jsonwebtoken'

export const authDoctor_VerifyToken = async (req,res, next) => {

    const docToken = req.cookies.docToken;
    
    try {
        if(!docToken){
            return  res.status(401).json({ success: false, msg: "Unauthorized Access!" });
        }
        const decodeToken = jwt.verify(docToken,process.env.JWT_SECRET);

        if(!decodeToken){
            
            return  res.clearCookie('docToken').status(401).json({ success: false, msg: "Unauthorized Access!" });
        }
        
        req.user = decodeToken;
        next();

    } catch (err) {
         const error = {
            status: 401,
            message: 'Invalid or expired token'
        };
        next(error);
    }
}