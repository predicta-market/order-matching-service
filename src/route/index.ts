import express,{Request,Response} from 'express';
// import authRoute from './auth';
const router = express.Router();

// router.use('/auth',authRoute);

router.get('/check', (_req: Request, res: Response)=>{
    const currentDateTime = new Date().toISOString(); 
    res.status(200).json({ 
        status: 'success', 
        message: 'user-management microservice is operational.',
        datetime: currentDateTime 
    });
});

export default router;