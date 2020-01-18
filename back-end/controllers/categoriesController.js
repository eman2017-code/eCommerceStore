const express = require('express')
const Category = require('../models/category.js')
const Product = require('../models/product.js')
const staffAccountRequired = require('../middleware/users/staffAccountRequired.js')

const router = express.Router()


// Index Route
// this route returns all of the categories that exist
router.get('/', async (req, res, next) => {
	try {
		const allCategories = await Category.find({})

		res.json({
			data: allCategories,
			status: {
				code: 200,
				message: 'Successfully found all categories' 
			}
		})		
	} catch (error) {
		next(error)
	}	
})


// Show Route
// this route shows a single category along with all the products in the category
router.get('/:categoryId/', async (req, res, next) => {
	try {
		const foundCategory = await Category.findById(req.params.categoryId)
		const foundProducts = await Product.find({ 'category': foundCategory.id })

		// combines the category with the categories products to they can be returned
		// in the same object
		const foundCategoryAndProducts = {
			category: foundCategory,
			products: foundProducts
		}

		res.json({
			data: foundCategoryAndProducts,
			status: {
				code: 200,
				message: 'Successfully found categories'
			}
		})

	} catch (error) {
		next(error)
	}		
})


// Create Route
// this is where the admin can create a new category
router.post('/', staffAccountRequired, async (req, res, next) => {
	const categoryName = req.body.name

	try {
		const newCategory = await Category.create({ 'name': categoryName })

		res.json({
			data: newCategory,
			status: {
				code: 201,
				message: 'New category successfully created'
			}
		})

	} catch (error) {
		next(error)
	}
})


// Update Route
// this route is where a categories name and products can be updated by the admin
router.put('/:categoryId/', staffAccountRequired, async (req, res, next) => {
	const categoryName = req.body.name

	try {
		const updatedCategory = await Category.findById(req.params.categoryId)
		updatedCategory.name = categoryName
		await updatedCategory.save()

		res.json({
			data: updatedCategory,
			status: {
				code: 200,
				message: 'Successfully updated category'
			}
		})

	} catch (error) {
		next(error)
	}
})


// Delete Route
// this route is where the admin can delete a category
router.delete('/:categoryId/', async (req, res, next) => {
	try {
		const deletedCategory = Category.findByIdAndRemove(req.params.categoryId).exec()

		res.json({
			data: {},
			status: {
				code: 204,
				message: 'Category successfully deleted'
			}
		})
	} catch (error) {
		next(error)
	}	
})



module.exports = router


