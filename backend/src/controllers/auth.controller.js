import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
export const signup = async (req, res) => {
      const {fullName, email, password} = req.body 
      try {
         if (!fullName || !email || !password) {return res.status(400).json({message: "All fields are required"})} 
         if (password.length < 6) {return res.status(400).json({message: "Password must be 6 letters"})};
         const user = await User.findOne({email});
         if (user) res.status(400).json({message: "Email Already exists"});
         
         const salt  = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);
         const newUser  = new User({
            fullName,
            email,
            password: hashedPassword
         })  
         if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({_id: newUser.id, fullName: newUser.fullName, email: newUser.email, profilePic: newUser.profilePic})
         }else {
            res.status(400).json({message: "Invalid User Data"});
         }
      } catch (error) {
        console.log("Getting Error During SignUp API's", error.message);
        res.status(501).json({message: "Internal Server Error"});
      }
}
export const login = async (req, res) => {
   const {email, password} = req.body;  
   try {
      const user = await User.findOne({email});
      if (!user) {return res.status(400).json({message: 'Invalid Credentials'})};
      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect){return res.status(400).json({message: "Invalid Credentials"})};
      generateToken(user._id, res);
      res.status(200).json({_id: user._id, fullName: user.fullName, email: user.email, profilePic: user.profilePic}); 
   
   } catch (error) {
      console.log("Error in login")   
   }
}
export const logout = (req, res) => {
     try {
        res.cookie('jwt', '', {maxAge: 0});
        res.status(200).json({message: "Logout Successfully"});
     } catch (error) {
        console.log("Error is In Controller", error);
        res.status(501).json({message: "Internal Server Error"});
     }
}


export const updateProfilePic = async (req, res) => {
   try {
      const {profilePic} = req.body;
      const userId = req.user._id;
      if (!profilePic) {return res.status(400).json({message: "Image Pic not Provided"})};
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      const updatedUser  = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});
   
      res.status(200).json(updatedUser);
   } catch (error) {
      
   }
}

export const checkAuth = (req, res) =>  {
   try {
      res.status(200).json(req.user);
   } catch (error) {
      console.log("Error in Checking Auth", error);
      res.status(500).json({message: "Internal Server Error"});
   }
}