import { Router, Request, Response } from 'express';
import { createCar, getAllCar, getCarById, updateCarById, deleteCarById } from './controllers/carController';
import { loginUser, registerUser, verifyToken } from './controllers/authController';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    //connect to the db
    res.status(200).send('Welcome to the MENTS API');
    //disconnect from the db
});

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.post('/cars', createCar);
router.get('/cars', getAllCar);
router.get('/cars/:id', getCarById);
router.put('/cars/:id', updateCarById);
router.delete('/cars/:id', verifyToken, deleteCarById);

export default router;