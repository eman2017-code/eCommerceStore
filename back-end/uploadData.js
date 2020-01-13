const fs = require('fs')
const Product = require('./models/product.js')
const Category = require('./models/product.js')

const productsData = fs.readFileSync('products.json')

const products = JSON.parse(productsData)


// iterate through each product and create a new mongodb product
const mogngoDbProducts = products.map(async (product) => {

	try {
		const newProduct = await Product.create({
			sku: products.sku,
			name: product.name,
			type: product.type,
			upc: product.upc,
			price: product.price,
			shipping: product.shipping,
			manufacturer: product.manufacturer,
			model: product.model,
			image: product.image,
			description: product.description
		})

		// iterate through each category on the products and create a new one if it doesnt exists,
		// then add the category to the product
		product.category.forEach(async (category) => {
			const getCategory = await Category.find({ 'name': category.name })

			if (!doesCategoryExist) {
				const newCategory = await Category.create({
					name: category.name
				})
				newProduct.push(newCategory)
				await newProduct.save()

			} else {
				newProduct.push(getCategory)
				await newProduct.save()
			}

			
		})

		console.log('product created')
		return newProduct

	} catch (error) {
		console.log('ERROR:', error)
	}
})




