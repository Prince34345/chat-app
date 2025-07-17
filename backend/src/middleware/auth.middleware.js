import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const protectAuthRoute = async (req, res, next) => {
   const token = req.cookies.jwt; 
   if (!token) {return res.status(401).json({message: "Unauthorized, No token"})}
   try {
     const decoded  = jwt.verify(token, process.env.JWT_SECRET);
     if (!decoded) {return res.status(401).json({message: "Unauthorized, No Token, Verified"})}
     const user = await User.findById(decoded.userId).select("-password"); 
     if (!user) {return res.status(404).json({message: "User not found"})} 
     req.user = user
     next()
   } catch (error) {
      console.log("Error At Authentication", error);
      res.status(501).json({message: "Internal Server Error"});
   }
}