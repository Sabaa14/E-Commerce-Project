import { IOrder } from "../interfaces/Order";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import { Request, Response } from "express";
import { IProduct } from "../interfaces/Product";
const admin = require('../middleware/auth')
const Order = require('../models/orders.model');


const createorder = async (req: AuthenticatedRequest<IOrder>, res: Response) => {

    const orderData = req.body ;

    if (!orderData) {
        return res.status(400).json({ message: "Order data is required" });
    }

    try {
        const newOrder = new Order(orderData);
        await newOrder.save();

        res.status(201).json({ message: 'Order created successfully', order: newOrder })

    } catch (error) {
        console.log("Error from createorder :", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
const showorders = async (req: AuthenticatedRequest, res: Response) => {

    const user = req.user;

    try {
        const getAllOrders = await Order.find({ user: req.user._id });
        res.status(200).json({ success: true, data: getAllOrders })

    } catch (error) {
        console.log("Error from showorders :", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}


const showorderById = async (req: Request<{ orderId: string }>, res: Response) => {
    const { orderId } = req.params;

    if (!orderId) {
        return res.status(400).json({ message: 'Given Order Id is incorrect' });
    }

    try {
        const searchedOrder = await Order.findById(orderId);

        if (!searchedOrder) {
            return res.status(404).json({ message: ' Order is not found' });
        }

        return res.status(200).json({
            success: true,
            data: searchedOrder
        })

    } catch (error) {
        console.log("Error from showorderById :", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
const showorderAdmin = async (req: AuthenticatedRequest, res: Response) => {

    const user = req.user;

    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'This order is only allowed to the admin' });
    }

    try {
        const adminOrder = await Order.find().populate('user').populate('items.product');
        res.status(200).json({ success: true, data: adminOrder })

    } catch (error) {
        console.log("Error from showorderAdmin :", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }

}



module.exports = {
    createorder,
    showorders,
    showorderById,
    showorderAdmin
}