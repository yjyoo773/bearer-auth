'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Added
require('dotenv').config() // Added

const users = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Adds a virtual field to the schema. We can see it, but it never persists
// So, on every user object ... this.token is now readable!
users.virtual('token').get(function () {
  let tokenObject = {
    username: this.username,
  }
  // Add time limit to jwt token
  // Create process.env.SECRET using the crypto library
  return jwt.sign(tokenObject, process.env.SECRET,{expiresIn:'1h'})  // Add process.env.SECRET
});

users.pre('save', async function () {
  if (this.isModified('password')) {      // Returns true if any of the given paths is modified, else false. If no arguments, returns true if any path in this document is modified.
    this.password = await bcrypt.hash(this.password, 10);    // add await
  }
});

// BASIC AUTH
users.statics.authenticateBasic = async function (username, password) {
  const user = await this.findOne({ username })
  const valid = await bcrypt.compare(password, user.password)
  console.log("authenticateBasic",password,user.password,valid)
  if (valid) { return user; }
  throw new Error('Invalid User');
}

// BEARER AUTH
users.statics.authenticateWithToken = async function (token) {
  try {
    const parsedToken = jwt.verify(token, process.env.SECRET);
    const user = this.findOne({ username: parsedToken.username })
    if (user) { return user; }
    throw new Error("User Not Found");
  } catch (e) {
    throw new Error(e.message)
  }
}


module.exports = mongoose.model('users', users);