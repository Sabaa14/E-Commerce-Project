export interface IReview {
  _id?: string;
  name?: string;
  email?: string;
  user?: string; // MongoDB ObjectId as string
  rating: number;
  comment: string;
  createdAt?: Date;
}

export interface IProduct {
  _id?: string;
  title: string;
  description: string;
  price: number;
  photo?: {
    data: Buffer;
    contentType: string;
  };
  reviews: IReview[];
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