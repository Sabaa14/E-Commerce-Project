import { IProduct } from "../interfaces/Product";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import { Request, Response } from "express";

const Product = require('../models/products.model');

const showcategories = async (req : AuthenticatedRequest , res :Response) => {
    
}
const createcategories = async (req : AuthenticatedRequest , res :Response) => {

}
const updatecategorieById = async (req : AuthenticatedRequest , res :Response) => {

}
const deletecategorieById = async (req : AuthenticatedRequest , res :Response) => {

}
    

module.exports = {
    showcategories,
    createcategories,
    updatecategorieById,
    deletecategorieById
}





