import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import { Request, Response } from "express";
import { ICategory } from '../interfaces/Category'

const Category = require('../models/category.model');

const showcategories = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const showAllCategories = await Category.find();
        res.status(200).json({
            success: true,
            data: showAllCategories
        })

    } catch (error) {
        console.log("Error from showcategories :", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const createCategories = async (req: AuthenticatedRequest<ICategory>, res: Response) => {
    const { name, slug, description } = req.body;

    if (!name || !slug || !description) {
        return res.status(400).json({ message: 'All fields are required.!' })
    }
    try {

        const searchedCate = await Category.findOne({ name });

        if (searchedCate) {
            return res.status(400).json({ message: 'Category name has already been taken !' })
        }

        const newCate = new Category({
            name: name,
            slug: slug,
            description: description
        })

        await newCate.save();
        res.status(201).json({
            success: true, message: 'A new Category has been created', data: newCate
        })

    } catch (error) {
        console.log("Error from createcategories :", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const updateCategorieById = async (req: AuthenticatedRequest<ICategory>, res: Response) => {
    const categoryId = req.params.id;
    const { name, slug, description } = req.body;

    if (!name || !slug || !description) {
        return res.status(400).json({ message: 'All fields are required.!' })
    }

    try {

        const searchedCateByIdAndUpdate = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
        if (!searchedCateByIdAndUpdate) {
            return res.status(400).json({ success: false, message: "could not found the Category!" });
        }

        res.status(200).json({
            success: true,
            message: "Category has been updated",
            data: searchedCateByIdAndUpdate
        })

    } catch (error) {
        console.log("Error from updatecategorieById :", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const deleteCategorieById = async (req: AuthenticatedRequest, res: Response) => {
    const categoryId = req.params.id;

    try {
        const searchedCateByIdAndDelete = await Category.findByIdAndDelete(categoryId);
        if (!searchedCateByIdAndDelete) {
            return res.status(404).json({ success: false, message: "No Category found with the given id" });
        }

        res.status(200).json({ success: true, message: " the Category has been successfully deleted" });

    } catch (error) {

        console.log("Error from deletecategorieById :", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}


module.exports = {
    showcategories,
    createCategories,
    updateCategorieById,
    deleteCategorieById
}





