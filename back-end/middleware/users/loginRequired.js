
// requires users to be logged in to access certain routes
const loginRequired = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.json({
      data: {},
      status: {
        code: 403,
        message: "You are not logged in"
      }
    });
  } else {
    next();
  }
};

module.exports = loginRequired;