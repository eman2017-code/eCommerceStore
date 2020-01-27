const express = require("express");
const User = require("../models/user.js");
const Cart = require("../models/cart.js");
const loginRequired = require("../middleware/users/loginRequired.js");

const router = express.Router();


// for testing
router.get('/test/', async (req, res, next) => {
  res.json({
    data: {},
    status: {
      code: 200,
      message: 'Users controller is working.'
    }
  })
});


router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});

    res.json({
      data: users
    });
  } catch (error) {
    next(error);
  }
});

// this route is where new users signup
router.post("/register/", async (req, res, next) => {
  const clientData = req.body;

  try {
    const doesEmailExist = await User.findOne({ email: clientData.email });

    // if the email already exists
    if (doesEmailExist !== null) {
      res.json({
        data: {},
        status: {
          code: 403,
          message: "Email already exists"
        }
      });
    } else {
      // encrypts password, creates new user and logs them in
      const passwordHash = User.encryptPassword(clientData.password);
      const newUser = await User.create({
        firstName: clientData.firstName,
        lastName: clientData.lastName,
        email: clientData.email,
        password: passwordHash,
      });
      newUser.login(req);

      // creates a cart for the new user
      await Cart.createNewCart(newUser.id);

      res.json({
        data: newUser.removePassword(),
        status: {
          code: 201,
          message: "Successfully signed up"
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

// this route is where users login
router.post("/login/", async (req, res, next) => {
  const clientData = req.body;

  try {
    const foundUser = await User.findOne({ email: clientData.email });

    // logs in the user if the email and password match
    if (
      foundUser &&
      User.doPasswordsMatch(clientData.password, foundUser.password)
    ) {
      foundUser.login(req);

      return res.json({
        data: foundUser.removePassword(),
        status: {
          code: 200,
          message: "Successfully logged in"
        }
      });
    } else {
      return res.json({
        data: {},
        status: {
          code: 401,
          message: "Incorrect username or password"
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

// this route is where the admin can initially register
router.post("/admin/register/", async (req, res, next) => {
  const clientData = req.body;
  try {
    const doesEmailExist = await User.findOne({ email: clientData.email });
    // if the email already exists
    if (doesEmailExist !== null) {
      res.json({
        data: {},
        status: {
          code: 403,
          message: "Email already exists"
        }
      });
    } else {
      // if the password matches the admins password in the enviroment
      if (clientData.password == process.env.ADMIN_PASSWORD) {
        // encrypts password, creates new user and logs them in
        const passwordHash = User.encryptPassword(clientData.password);
        const newAdmin = await User.create({
          firstName: clientData.firstName,
          lastName: clientData.lastName,
          email: clientData.email,
          password: passwordHash,
          isAdmin: true
        });
        newAdmin.login(req);
        res.json({
          data: newAdmin.removePassword(),
          status: {
            code: 201,
            message: "Successfully signed up"
          }
        });
      } else {
        res.json({
          data: {},
          status: {
            code: 401,
            message: "Incorrect registration credentials"
          }
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

// this is where the admin or staff user can login
router.post("/admin/login/", async (req, res, next) => {
  const clientData = req.body;
  try {
    const foundUser = await User.findOne({ email: clientData.email });
    // if the user trying to login is not the admin
    if (foundUser.isAdmin === false) {
      res.json({
        data: {},
        status: {
          code: 401,
          message: "You must be an admin to login here"
        }
      });
    }
    // logs in the user if the email and password match
    if (
      foundUser &&
      User.doPasswordsMatch(clientData.password, foundUser.password)
    ) {
      foundUser.login(req);
      res.json({
        data: foundUser.removePassword(),
        status: {
          code: 200,
          message: "Successfully logged in"
        }
      });
    } else {
      res.json({
        data: {},
        status: {
          code: 401,
          message: "Incorrect username or password"
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

// this route is where users logout
router.post("/logout/", loginRequired, async (req, res, next) => {
  try {
    await req.session.destroy();
    res.json({
      data: {},
      status: {
        code: 200,
        message: "User successfully logged out"
      }
    });
  } catch (error) {
    next(error);
  }
});

// this routes deletes a users account
router.delete("/deleteAccount/", loginRequired, async (req, res, next) => {
  try {
    const foundUser = await User.deleteOne({ _id: req.session.userId });
    res.json({
      data: {},
      status: {
        code: 200,
        message: "You have successfully deleted your profile"
      }
    });
  } catch (err) {
    next(err);
  }
});

// this routes updates the users password
router.put("/password/:userId/", loginRequired, async (req, res, next) => {
  const clientData = req.body;

  const oldPassword = clientData.oldPassword;
  const newPassword = clientData.newPassword;

  try {
    const user = await User.findOne({ _id: req.params.userId });

    // if the users correctly entered their old password
    if (User.doPasswordsMatch(oldPassword, user.password)) {
      const newPasswordHash = User.encryptPassword(newPassword);
      user.password = newPasswordHash;
      await user.save();

      res.json({
        data: user.removePassword(),
        status: {
          code: 200,
          message: "Password has been changed successfully"
        }
      });
    } else {
      res.json({
        data: {},
        status: {
          code: 401,
          message: "Incorrect password"
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
