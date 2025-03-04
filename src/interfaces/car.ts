import { User } from './user';

export interface Car extends Document {
      brand: string;
      model: string;
      engine: string;
      year: number;
      imageURL: string;
      price: number;
      stock: number;
      isOnDiscount: boolean;
      discountPct: number;
      isHidden: boolean;
      _createdBy: User['id'];
}