import { Document, Types } from "mongoose";

export interface ICartItem {
    product: Types.ObjectId; // reference to Product
    quantity: number;
}

export interface ICart extends Document {
    user: Types.ObjectId; // reference to User
    items: ICartItem[];
    updatedAt: Date;
}