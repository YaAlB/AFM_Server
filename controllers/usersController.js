const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getUser = asyncHandler(async (req, res) => {
    const { id } = req

    // Get user data from MongoDB
    const user = await User.find({_id: id}).select('-password').lean()

    console.log(user)
    console.log(id)
    // If no users 
    if (!user?.length) {
        return res.status(400).json({ message: 'No user found' })
    }

    res.json(user)
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req
    const { username, password } = req.body

    // Confirm data 
    if (!username) {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.find({_id: id}).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    user.username = username

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

module.exports = {
    getUser,
    updateUser
}