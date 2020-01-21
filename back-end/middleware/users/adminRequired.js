

// requires the user to be either the admin or a staff account
const adminRequired = (req, res, next) => {
	if (!req.session.isAdmin) {
		res.json({
			data: {},
			status: {
				code: 403,
				message: 'You do not have access to this resource'
			}
		})
	} else {
		next()
	}
}

module.exports = adminRequired;





