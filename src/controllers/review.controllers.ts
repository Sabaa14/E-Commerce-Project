import { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';
import { IProduct, IReview } from '../interfaces/Product';
const Product = require('../models/product.model');


const createreview = async ( req: AuthenticatedRequest<IReview> , res :Response) => {
    const { rating, comment, name, email } = req.body;
    const user = req.user;
    const productId = req.params.id;
    const userId= req.user?._id;

    try {
        const searchedProduct = await Product.findById(productId);
        if (!searchedProduct){
             return res.status(404).json({ message: 'Product not found' });
        }

        const existingReview = searchedProduct.reviews.find(
            (review) => String(review.user) === String(userId) );

        if (existingReview) {
          return res.status(400).json({ message: 'User has already written a review' });
        }

        const newReview = {
            name: name || user?.name,
            email: email || user?.email,
            user: user?._id,
            rating,
            comment,
            createdAt: new Date()
            };


        searchedProduct.reviews.push(newReview);
        await searchedProduct.save();

        res.status(201).json({message: ' A new review has been created'})
    
    } catch (error) {
         console.log("Error from createreview :", error.message);
         res.status(500).json({ message: "Server Error", error: error.message });
    }
}
    
const showreview = async ( req: AuthenticatedRequest , res :Response) => {
    
    const productId = req.params.id;

    try {
        const searchedProduct = await Product.findById(productId);
        if(!searchedProduct){
         return res.status(404).json({ message: 'Product not found' });
        }

        const reviews = searchedProduct.reviews;
        // filter by newest 
        const filteredReviewsByDate =[...reviews].sort((a,b) => 
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()) ;
        // filter by highest / and also using the copie to not have the sorting methode being overwritten by the first one
        const filteredReviewsByrating =[...reviews].sort((a,b) => b.rating - a.rating);

        res.status(200).json({
            success : true ,
            byDate : filteredReviewsByDate,
            byRating : filteredReviewsByrating
        })

    } catch (error) {
         console.log("Error from showreview :", error.message);
         res.status(500).json({ message: "Server Error", error: error.message });
    }
    }


    
const deletereview = async ( req: AuthenticatedRequest , res :Response) => {
    const user = req.user;
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;
    
    try {
         const searchedProduct = await Product.findById(productId);
        if(!searchedProduct){
         return res.status(404).json({ message: 'Product not found' });
        }
        // chat meant that would be wrong to do ! i had to use searchedProduct.reviews.id(reviewId)
        const searchedReview = await searchedProduct.findById(reviewId);
         if(!searchedReview){
         return res.status(404).json({ message: 'Review not found' });
        }
        if(!user || user.role !== 'admin'){
         return res.status(403).json({ message: 'Access denied , not allowed to delete the Review' });
        }
        // found this methode to be able to pull the review from the product and then update the product again 
        // also found later that i just can searchedReview.remove();  -------- > await searchedProduct.save();
        await Product.findByIdAndUpdate(
            productId,
            { $pull : { reviews : { _id :reviewId } } },
            { new : true }
            
        )
        res.status(200).json({ message: 'Review deleted successfully' });

    } catch (error) {
        console.log("Error from deletereview :", error.message);
         res.status(500).json({ message: "Server Error", error: error.message });
    }

}
    

module.exports ={
    createreview,
    showreview,
    deletereview
}