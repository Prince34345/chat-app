import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.io.js";


export const getUsersforSidebar = async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
      res.status(200).json(filteredUsers);
    } catch (error) {
      console.log("Error in Gettin Users", error);
      res.status(501).json({message: "Internal Server Error"});
    }
}

export const getCurrentMessages = async (req, res) => {
    try {
       const {id: userToChatId} = req.params
       const senderId = req.user._id;
       const messages = await Message.find({
           $or: [
              {senderId: senderId, recieverId: userToChatId,},
              {senderId: userToChatId, recieverId: senderId}
           ]
       })
       res.status(200).json(messages)
    } catch (error) {
        console.log("Error in Current Message", error);
        res.status(501).json({message: "Internal Server Error"});
    }
}

export const sendMessages = async (req, res) => {
     try {
        const { text, image } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl
        })

        await newMessage.save();
        const recieverSocketId = getRecieverSocketId(recieverId);
        if (recieverSocketId) {
             io.to(recieverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
     } catch (error) {
        console.log("error in senf")
     }
}