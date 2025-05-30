import { Schema, model } from 'mongoose';
import { Car } from '../interfaces/car';

const carSchema = new Schema<Car>({
      brand: { type: String, required: true, min: 1, max: 20},
      model: { type: String, required: true, min: 1, max: 20},
      engine: { type: String, required: true, min: 1, max: 20},
      year: { type: Number, required: true, min: 1886, max: new Date().getFullYear() + 1}, 
      imageURL: { type: String, required: true},
      price: { type: Number, required: true},
      stock: { type: Number, required: true},
      isOnDiscount: { type: Boolean, required: true, default: false},
      discountPct: { type: Number, required: true, default: 0},
      soldout: { type: Boolean, required: false},
      _createdBy: { type: String, ref: 'User', required: true }
});

export const carModel = model<Car>('Car', carSchema);