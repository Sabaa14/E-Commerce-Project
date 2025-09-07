import { UserInterface } from "../interfaces/User";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import { Response } from "express";
import { ICart } from "../interfaces/CartInterface";
const Cart = require('../models/cart.model');
const User = require('../models/user.model');

const showcart = (req: AuthenticatedRequest, res: Response) => {
    let user: UserInterface = req.user;
    try {
        let userCart = User.findById(user._id).select('cart');
        if (userCart.length === 0) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(userCart);
    } catch (error) {
        console.log("Error from showcart :", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Request => // req.body, req.params, req.query,
//  req.user

const createCart = async (req: AuthenticatedRequest, res: Response) => {
    let user = req.user;
    let cart = req.body as unknown as ICart;
    try {
        let newCart = new Cart({
            user: cart.user,
            items: cart.items,
        })
        await newCart.save();
        res.status(201).json({ message: "Cart created successfully", cart: newCart });
    } catch (error) {
        console.log("Error from createCart :", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const deletecartItem = (req: AuthenticatedRequest, res: Response) => {
    let user: UserInterface = req.user; // Access the authenticated user from the request
    // Logic to delete cart item
};

const deletecartAllItems = (req: AuthenticatedRequest, res: Response) => {
    let user: UserInterface = req.user; // Access the authenticated user from the request
    // Logic to delete all cart items
};

module.exports = {
    showcart,
    createCart,
    deletecartItem,
    deletecartAllItems
};