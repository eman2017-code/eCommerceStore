const express = require('express')
const Category = require('../models/category.js')
const adminRequired = require('../middleware/users/adminRequired.js')

const router = express.Router()


// Show Route
// this route shows a single category along with all the products in the category
router.get('/:categoryId/', async (req, res, next) => {
	try {
		const foundCategory = await Category.findById(req.params.categoryId)		
	} catch (error) {
		next(error);
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
		next(error);
	}
})


module.exports = router


