import express from 'express';
import authRoutes  from '../src/routes/auth.route.js';
import messageRoutes  from '../src/routes/message.route.js';
import { connectDB } from './lib/db.js';
import path from 'path';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import cors from 'cors';
import { app , server} from './lib/socket.io.js';

dotenv.config();
app
const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend" , "dist", "index.html"));
    })
}

app.get("/", (req, res) => {
   res.send("Hello from Server");
})
server.listen(PORT, (error) => {
    console.log(`Hello Server is Running ${PORT}`);
    connectDB();
})