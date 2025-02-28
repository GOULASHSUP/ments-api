import { Router, Request, Response } from 'express';
import { createProduct, getAllProduct, getProductById, updateProductById, deleteProductById } from './controllers/productController';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    //connect
    res.status(200).send('Welcome to the MENTS API');
    //disconnect
});

router.post('/products', createProduct);
router.get('/products', getAllProduct);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProductById);
router.delete('/products/:id', deleteProductById);

export default router;