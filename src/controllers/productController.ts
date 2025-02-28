import { Request, Response } from 'express';
import { productModel } from '../models/productModel';
import { connect, disconnect } from '../repository/database';

/**
 * Create a new product
 * @param req
 * @param res
 */
export async function createProduct(req: Request, res: Response): Promise<void> {
    const data = req.body;

    try {
        await connect();

        const product = new productModel(data);
        const result = await product.save();

        res.status(201).send(result);
    }
    catch (err) {
        res.status(500).send("Error creating product" + err);
    }
    finally {
        await disconnect();
    }
}


/**
    * Retrieve all products
    * @param req
    * @param res
    */
export async function getAllProduct(req: Request, res: Response) {

    try {
        await connect();

        const result = await productModel.find({});

        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send("Error retrieving product" + err);
    }
    finally {
        await disconnect();
    } 
}


/**
    * Retrieve a single product by its ID
    * @param req
    * @param res
    */
export async function getProductById(req: Request, res: Response) {

    try {
        await connect();

        const id = req.params.id;
        const result = await productModel.find({ _id: id });

        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send("Error retrieving product by id" + err);
    }
    finally {
        await disconnect();
    } 
}

/**
    * Update a single product by its ID
    * @param req
    * @param res
    */
export async function updateProductById(req: Request, res: Response) {

    const id = req.params.id;

    try {
        await connect();

        const result = await productModel.findByIdAndUpdate(id, req.body);

        if (!result) {
            res.status(404).send("Can't update product");
        }
        else {
            res.status(200).send("Product updated successfully");
        }

        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send("Error updating product by id" + err);
    }
    finally {
        await disconnect();
    } 
}

/**
    * Retrieve a single product by its ID
    * @param req
    * @param res
    */
export async function deleteProductById(req: Request, res: Response) {

    const id = req.params.id;

    try {
        await connect();

        const result = await productModel.findByIdAndDelete(id);

        if (!result) {
            res.status(404).send("Can't delete product with id=" + id);
        }
        else {
            res.status(200).send("Product deleted successfully");
        }

        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send("Error deleting product by id" + err);
    }
    finally {
        await disconnect();
    }
}