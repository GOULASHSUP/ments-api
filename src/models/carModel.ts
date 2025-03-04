import { Schema, model } from 'mongoose';
import { Car } from '../interfaces/car';

const carSchema = new Schema<Car>({
      brand: { type: String, required: true, min: 6, max: 255},
      model: { type: String, required: true, min: 6, max: 255},
      engine: { type: String, required: true, min: 6, max: 255},
      year: { type: Number, required: true},
      imageURL: { type: String, required: true},
      price: { type: Number, required: true},
      stock: { type: Number, required: true},
      isOnDiscount: { type: Boolean, required: true, default: false},
      discountPct: { type: Number, required: true, default: 0},
      isHidden: { type: Boolean, required: false},
      _createdBy: { type: String, ref: 'User', required: true }
});

export const carModel = model<Car>('Car', carSchema);