import { IProduct } from "./Product";

interface UserInterface {
    _id: string;
    name: string;
    email: string;
    address: string;
    phone: number;
    password: string;
    age: number;
    role: "user" | "admin";
    addresses: {
        street: string;
        city: string;
        zip: string;
        country: string;
    }[];
    wishlist: string[]; // array of ObjectIds
    cart: {
        product: string;  // ObjectId of Product
        quantity: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export type { UserInterface };