

// requires the current logged in user to be an admin to access certain routes
const adminRequired = (req, res, next) => {
	if (!req.session.isAdmin) {
		res.json({
			data: {},
			status: {
				code: 403,
				message: 'You are not the admin'
			}
		})
	} else {
		next()
	}
}

module.exports = adminRequired





