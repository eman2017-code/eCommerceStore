const express = require('express')
const Category = require('../models/category.js')
const Product = require('../models/product.js')
const adminRequired = require('../middleware/users/adminRequired.js')

const router = express.Router()


// Show Route
// this route shows a single category along with all the products in the category
router.get('/:categoryId/', async (req, res, next) => {
	try {
		const foundCategory = await Category.findById(req.params.categoryId).populate('products')

		res.json({
			data: foundCategory,
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
router.post('/', adminRequired, async (req, res, next) => {
	const clientData = req.body

	try {
		const newCategory = await Category.create(clientData)

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
// this route is where a categories name and products can be updated
router.put('/:categoryId/', async (req, res, next) => {
	const clientData = req.body
	const productIds = clientData.products

	try {
		const foundCategory = await Category.findById(req.params.categoryId)

		res.json({
			data: foundCategory,
			status: {
				code: 200,
				message: 'Successfully updated category'
			}
		})

	} catch (error) {
		next(error)
	}
})


module.exports = router


