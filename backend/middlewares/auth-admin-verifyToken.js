import jwt from 'jsonwebtoken'

export const authAdmin_VerifyToken = async (req,res, next) => {

    const adminToken = req.cookies.adminToken;
    try {
        if(!adminToken){
            return  res.status(401).json({ success: false, msg: "Unauthorized Access!" });
        }
        const decodeToken = jwt.verify(adminToken,process.env.JWT_SECRET);

        if(decodeToken.email !== process.env.ADMIN_EMAIL){
            return  res.clearCookie('adminToken').status(403).json({ success: false, msg: "Forbidden Access!" });
        }
        next();

    } catch (err) {
         const error = {
            status: 401,
            message: 'Invalid or expired token'
        };
        next(error);
    }
}