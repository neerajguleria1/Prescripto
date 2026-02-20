import express from 'express';
import { dbConnected } from './config/dbConnect.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { errorMiddlewares } from './middlewares/error-middlewares.js';
import { securityMiddleware } from './middlewares/security-middlewares.js';
import { connectCloudinary } from './config/cloudinary.js';
import Admin_Router from './src/routes/admin-routes.js';
import Doctor_Router from './src/routes/doctor-routes.js';
import User_Router from './src/routes/user-routes.js';
import dotenv from 'dotenv';
import initRedisClient from './config/redis.js';
import { validateEnv } from './config/validateEnv.js';
dotenv.config();

// Validate environment variables
validateEnv();


// app config
const app = express();
const PORT = process.env.PORT || 7060;
connectCloudinary();

// Calling advanced security middleware
securityMiddleware(app);

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));

//middleware to get ip address of the user network
app.set('trust proxy', true);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

//api end point
app.use('/api/admin', Admin_Router);
app.use('/api/doctor', Doctor_Router);
app.use('/api/user', User_Router);

//error middleware
app.use(errorMiddlewares);

const initAPP = async () => {
    await dbConnected();
    await initRedisClient();
}

initAPP().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT:-${PORT}`);
    })
}).catch((err) => {
    console.error('Database Connection Failed!', err);

})
