export interface IProduct {
  _id?: string; // MongoDB automatically assigns this
  title: string;
  description: string;
  price: number;
  photo?: {
    data: Buffer;
    contentType: string;
  };
  reviews: string;
  stock: number;
  category: string;
  variants?: {
    size?: string;
    color?: string;
    stock?: number;
  }[];
  discount?: number;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
