import { Request, Response } from 'express';
import { carModel } from '../models/carModel';
import { connect, disconnect } from '../repository/database';

/**
 * 
 * @param req
 * @param res
 */
export async function createCar(req: Request, res: Response): Promise<void> {
    const data = req.body;

    try {
        await connect();

        const car = new carModel(data);
        const result = await car.save();

        res.status(201).send(result);
    }
    catch (err) {
        res.status(500).send("Error creating new car" + err);
    }
    finally {
        await disconnect();
    }
}

/**
    * 
    * @param req
    * @param res
    */
export async function getAllCar(req: Request, res: Response) {

    try {
        await connect();

        const result = await carModel.find({});

        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send("Error retrieving car" + err);
    }
    finally {
        await disconnect();
    } 
}

/**
    * 
    * @param req
    * @param res
    */
export async function getCarById(req: Request, res: Response) {

    try {
        await connect();

        const id = req.params.id;
        const result = await carModel.find({ _id: id });

        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send("Error retrieving car by id" + err);
    }
    finally {
        await disconnect();
    } 
}

/**
    * 
    * @param req
    * @param res
    */
export async function updateCarById(req: Request, res: Response) {

    const id = req.params.id;

    try {
        await connect();

        const result = await carModel.findByIdAndUpdate(id, req.body);

        if (!result) {
            res.status(404).send("Can't update car");
        }
        else {
            res.status(200).send("Car updated successfully");
        }

        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send("Error updating car by id" + err);
    }
    finally {
        await disconnect();
    } 
}

/**
    * 
    * @param req
    * @param res
    */
export async function deleteCarById(req: Request, res: Response) {

    const id = req.params.id;

    try {
        await connect();

        const result = await carModel.findByIdAndDelete(id);

        if (!result) {
            res.status(404).send("Can't delete car with id=" + id);
        }
        else {
            res.status(200).send("Car deleted successfully");
        }

        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send("Error deleting car by id" + err);
    }
    finally {
        await disconnect();
    }
}