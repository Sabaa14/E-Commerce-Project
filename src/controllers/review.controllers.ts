import { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';
const Product = require('../models/product.model');


const createreview = async ( req: AuthenticatedRequest , res :Response) => {
    
}
    
const showreview = async ( req: AuthenticatedRequest , res :Response) => {
    
}
    
const deletereview = async ( req: AuthenticatedRequest , res :Response) => {
    
}
    

module.exports ={
    createreview,
    showreview,
    deletereview
}