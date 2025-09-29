import { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';
const User = require('../models/user.model');
const Product = require('../models/products.model');

const showWishlistItems = async (req: AuthenticatedRequest, res: Response) => {
    let user = req.user;
    try {
        let userWishlist = await User.findById(user._id).select('wishlist').populate('wishlist');
        res.status(200).json({ success: true, message: "wishlist fetched successfullu", wishlist: userWishlist });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlist items' });
    }
};

const createWishlistItem = async (req: AuthenticatedRequest, res: Response) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const userDoc = await User.findById(req.user._id);
        if (!userDoc) {
            return res.status(404).json({ message: 'User not found' });
        }

        const productIdStr = product._id.toString();
        if (userDoc.wishlist.includes(productIdStr)) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        userDoc.wishlist.push(productIdStr);
        await userDoc.save();

        res.status(201).json({ message: 'Product added to wishlist' });
    } catch (error) {
        console.error('Wishlist save error:', error);
        res.status(500).json({ message: 'Error adding product to wishlist' });
    }
};

const deleteWishlistItem = async (req: AuthenticatedRequest, res: Response) => {
    let productId = req.params.productId;
    try {
        const userDoc = await User.findById(req.user._id);
        if (!userDoc) {
            return res.status(404).json({ message: 'User not found' });
        }
        userDoc.wishlist = userDoc.wishlist.filter((item: any) => item.toString() !== productId);
        await userDoc.save();
        res.status(200).json({ message: 'Product removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from wishlist' });
    }
};

module.exports = { showWishlistItems, createWishlistItem, deleteWishlistItem };