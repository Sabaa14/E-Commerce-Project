import { Types } from "mongoose";

export interface IOrderItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
  product: Types.ObjectId; // reference to Product
}

export interface IOrder {
  _id?: Types.ObjectId; // MongoDB automatically adds this
  user: Types.ObjectId; // reference to User
  orderItems: IOrderItem[];
  totalPrice: number;
  paymentMethod: "PayPal" | "CreditCard" | "Stripe" | "CashOnDelivery";
  shippingAddress: string;
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus?: "pending" | "paid" | "failed" | "refunded";
  trackingNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
