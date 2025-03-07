import { Router, Request, Response } from 'express';
import {
    createCar,
    getAllCar,
    getCarById,
    updateCarById,
    deleteCarById
} from './controllers/carController';
import { loginUser, registerUser, verifyToken } from './controllers/authController';

const router: Router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - App Routes
 *     summary: Health check
 *     description: Basic route to check if the API is running
 *     responses:
 *       200:
 *         description: Server up and running.
 */
router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to the MENTS API');
});

/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Register a new user
 *     description: Registers a new user in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/user/register', registerUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: User login
 *     description: Logs in a user and returns a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 */
router.post('/user/login', loginUser);

/**
 * @swagger
 * /cars:
 *   post:
 *     tags:
 *       - Car Routes
 *     summary: Add a new car
 *     description: Creates a new car and stores it in the database
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Car"
 *     responses:
 *       201:
 *         description: Car added successfully
 */
router.post('/cars', createCar);

/**
 * @swagger
 * /cars:
 *   get:
 *     tags:
 *       - Car Routes
 *     summary: Get all cars
 *     description: Retrieves a list of all cars
 *     responses:
 *       200:
 *         description: List of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Car"
 */
router.get('/cars', getAllCar);

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     tags:
 *       - Car Routes
 *     summary: Get a car by ID
 *     description: Retrieves details of a specific car by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the car to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Car"
 *       404:
 *         description: Car not found
 */
router.get('/cars/:id', getCarById);

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     tags:
 *       - Car Routes
 *     summary: Update a car by ID
 *     description: Updates the details of an existing car
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the car to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Car"
 *     responses:
 *       200:
 *         description: Car updated successfully
 */
router.put('/cars/:id', verifyToken, updateCarById);

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     tags:
 *       - Car Routes
 *     summary: Delete a car by ID
 *     description: Deletes a specific car from the database
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the car to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 */
router.delete('/cars/:id', verifyToken, deleteCarById);

export default router;