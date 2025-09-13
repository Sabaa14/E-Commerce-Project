import { UserInterface } from "../interfaces/User";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import { Response } from "express";
import { ICart } from "../interfaces/CartInterface";
const Cart = require('../models/cart.model');
const User = require('../models/user.model');

const showcart = async (req: AuthenticatedRequest, res: Response) => {
    let user = req.user;
    try {
        let userCart = await User.findById(user._id).select('cart');
        if (!user.cart || !userCart.cart || userCart.length === 0) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(userCart.cart);
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

const deletecartItem = async  (req: AuthenticatedRequest, res: Response) => {
    let user = req.user; // Access the authenticated user from the request
    let id = user._id;

    try {
        let searchedUser = await User.findById(id).select('cart');
        
        if(!searchedUser){
            return res.status(404).json({ message: "Cart not found" });
            }
            
        const itemId = req.params.itemId ;
        const itemExists = searchedUser.cart.find(
            item => item.product.toString() === itemId
        );
        if(!itemExists){
         return res.status(404).json({ message: "Item not found" });
        }
    
        searchedUser.cart = searchedUser.cart.filter(
            item => item.product.toString() !== itemId
        );
    
        
        await searchedUser.save();
        res.status(200).json({ message: "Item successfully deleted" , cart: searchedUser.cart});
    
        
    } catch (error) {
          console.log("Error from deletecartItem :", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const deletecartAllItems = async (req: AuthenticatedRequest, res: Response) => {
    let user: UserInterface = req.user; // Access the authenticated user from the request
    try {
        
            const searchedUser = await User.findById(user._id).select('cart');
        
            if(!searchedUser){
                      return res.status(404).json({ message: "Cart not found" });
                }
        
             searchedUser.cart = [];
             await searchedUser.save();
            res.status(200).json({ message: "All Items successfully deleted" , cart: searchedUser.cart});
        
} catch (error) {
  console.log("Error from deletecartAllItems :", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
}
    
};

module.exports = {
    showcart,
    createCart,
    deletecartItem,
    deletecartAllItems
};