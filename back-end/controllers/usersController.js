const express = require("express");
const User = require("../models/user.js");
const loginRequired = require("../middleware/users/loginRequired.js");

const router = express.Router()


// this route is where new users signup
router.post("/signup/", async (req, res, next) => {
  const clientData = req.body

  try {
    const doesEmailExist = await User.findOne({ email: clientData.email })

    // if the email already exists
    if (doesEmailExist !== null) {
      res.json({
        data: {},
        status: {
          code: 403,
          message: "Email already exists"
        }
      })

    } else {
      // encrypts password and creates new user
      const passwordHash = User.encryptPassword(clientData.password);
      const newUser = await User.create({
        firstName: clientData.firstName,
        lastName: clientData.lastName,
        email: clientData.email,
        password: passwordHash,
      })

      newUser.login(req)
      newUser.removePassword()

      res.json({
        data: newUser,
        status: {
          code: 201,
          message: "Successfully signed up"
        }
      })
    }
  } catch (error) {
    next(error)
  }
})


// this route is where users login
router.post("/login/", async (req, res, next) => {
  const clientData = req.body

  try {
    const foundUser = await User.findOne({ email: clientData.email })

    // logs in the user if the email and password match
    if (foundUser && User.doPasswordsMatch(clientData.password, foundUser.password)) {
      foundUser.login(req)
      foundUser.removePassword()

      return res.json({
        data: foundUser,
        status: {
          code: 200,
          message: "Successfully logged in"
        }
      })

    } else {
      return res.json({
        data: {},
        status: {
          code: 401,
          message: "Incorrect username or password"
        }
      })
    }
  } catch (error) {
    next(error)
  }
})

// this route is where users logout
router.post("/logout/", loginRequired, async (req, res, next) => {
  try {
    await req.session.destroy()
    res.json({
      data: {},
      status: {
        code: 200,
        message: "User successfully logged out"
      }
    });
  } catch (error) {
    next(error)
  }
})


// this routes updates the users password
router.put("/password/:userId/", loginRequired, async (req, res, next) => {
  const clientData = req.body

  const oldPassword = clientData.oldPassword
  const newPassword = clientData.newPassword

  try {
    const user = await User.findOne({ _id: req.params.userId })

    // if the users correctly entered their old password
    if (User.doPasswordsMatch(oldPassword, user.password)) {
      const newPasswordHash = User.encryptPassword(newPassword)
      user.password = newPasswordHash
      await user.save()
      user.removePassword()

      res.json({
        data: user,
        status: {
          code: 200,
          message: "Password has been changed successfully"
        }
      })
    } else {
      res.json({
        data: {},
        status: {
          code: 401,
          message: "Incorrect password"
        }
      })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router







