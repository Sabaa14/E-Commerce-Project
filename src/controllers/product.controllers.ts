import { IProduct } from "../interfaces/Product";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import mongoose from "mongoose";
import { Repository } from 'typeorm';
import { Response } from "express";
import { QueryParams } from "../interfaces/query";
const Product = require('../models/product.model');



const showproducts = async (req: AuthenticatedRequest , res : Response)=> {

    try {
        // define the default values of the using filter,sort and paginate
         const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      ...filters
    } = req.query as unknown as QueryParams;

    // to be able to filter , sort and paginate in the items that we have at the full products list
    const fetchAllProducts = Product.find(filters) 
      .sort({ [sortBy]: sortOrder })    
      .skip((page - 1) * limit)     
      .limit(Number(limit));

      const products = await fetchAllProducts;
      // count the number of the docs we have in the collection that match the given filter
      const totalproducts = await Product.countDocuments(filters);

        // send the response of the sent data 
        res.status(200).json({
      success: true,
      data: products,
      page: Number(page),
      totalPages: Math.ceil(totalproducts / Number(limit)),
      totalItems: totalproducts,
    });

} catch (error) {
     console.log("Error from showproducts :", error.message);
     res.status(500).json({ message: "Server Error", error: error.message });
}
}

const showproductById = async (req: AuthenticatedRequest , res : Response)=> {

  try {
    const productId = req.params.id;
    if(!productId){
      return res.status(400).json({message: 'Given Id is incorrect'})
    }

    const searchedProduct = await Product.findById(productId);
    if(!searchedProduct){
      return res.status(404).json({message: 'Product is not found'})
    }
     
    return res.status(200).json({
      success : true ,
      data : searchedProduct
    })

  } catch (error) {
     console.log("Error from showproductById :", error.message);
     res.status(500).json({ message: "Server Error", error: error.message });
  }

}

const createproducts = async (req: AuthenticatedRequest , res : Response)=> {

  try {
    const productData: IProduct = req.body as unknown as IProduct;

  if (!productData) {
    return res.status(400).json({ message: "Product data is required" });
  }

    const newProduct  = new Product(productData);
           
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
} catch (error) {
   console.log("Error from createproducts :", error.message);
     res.status(500).json({ message: "Server Error", error: error.message });
}

}

const updateproductById = async (req: AuthenticatedRequest , res : Response)=> {

  const productId =  req.params.id;

  try {

  const updatedproduct = await Product.findByIdAndUpdate(productId , req.body , {new : true}) 

  if(!updatedproduct){
    return res.status(400).json({success: false , message : "could not found the Product!"});
  }
   res.status(200).json({
            success: true,
            message: "Product has been updated",
            product:updatedproduct
        })

  } catch (error) {
    console.log("Error from updateproductById :", error.message);
     res.status(500).json({ message: "Server Error", error: error.message });
  }

}

const deleteproductById = async (req: AuthenticatedRequest , res : Response)=> {
  const productId =  req.params.id;

  if(!productId){
    return res.status(404).json({message: 'could not found the Product!'})
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if(!deletedProduct){
      return res.status(404).json({success : false , message : "No Product found with the given id"});
    }
    
    res.status(200).json( { success : true ,message :" the Product has been successfully deleted"});
  } catch (error) {
     console.log("Error from deleteproductById :", error.message);
     res.status(500).json({ message: "Server Error", error: error.message });
  }

}



module.exports = { 
  showproducts ,
  showproductById ,
  createproducts ,
  updateproductById ,
  deleteproductById
}