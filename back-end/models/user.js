const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// this schema represents the user
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // isAdmin: {
  //   type: Boolean,
  //   default: false
  // },
  // isStaff: {
  //   type: Boolean,
  //   default: false
  // },
  active: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

// logs in the user
userSchema.methods.login = function(req) {
  req.session.isLoggedIn = true
  // req.session.isAdmin = this.isAdmin
  // req.sessions.isStaff = this.isStaff
  req.session.userId = this.id
  req.session.email = this.email
}

// coverts the user instance to an object and removes the password hash
userSchema.methods.removePassword = function() {
  const userObject = this.toObject()
  delete userObject.password
  return userObject
}

// checks if password match
userSchema.statics.doPasswordsMatch = function(passwordToCheck, passwordHash) {
  return bcrypt.compareSync(passwordToCheck, passwordHash)
}

// encrypts the users password
userSchema.statics.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// create a User model from the schema
const User = mongoose.model("User", userSchema)

module.exports = User
