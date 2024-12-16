import express from 'express';
import dotenv from 'dotenv';  // Fixed typo here
import authRoutes from './auth.route.js';
import cookieParser from 'cookie-parser'
import cros from "cors";
import { conectDB } from './lib/db.js'
import messageRouter from './routes/messageRout.js'


const app = express();
dotenv.config();  // Load environment variables from .env file
const port = process.env.PORT || 3000;  // Default to 3000 if PORT is not set
app.use(express.json());
app.use(cookieParser());
app.use(cros(
    {
        origin:"http://localhost:5173",
    credentials:true,
}
));
app.use('/api/auth', authRoutes);

app.use('/api/message', messageRouter);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    conectDB();
});
