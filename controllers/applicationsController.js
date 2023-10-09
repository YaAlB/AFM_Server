const Application = require('../models/Application')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all applications 
// @route GET /applications
// @access Private
const getAllApplications = asyncHandler(async (req, res) => {
    // Get all applications from MongoDB
    const applications = await Application.find().lean()

    // If no application 
    if (!applications?.length) {
        return res.status(400).json({ message: 'No applications found' })
    }

    // Add username to each application before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const applicationsWithUser = await Promise.all(applications.map(async (application) => {
        const user = await User.findById(application.user).lean().exec()
        return { ...application, username: user.username }
    }))

    res.json(applicationsWithUser)
})

// @desc Create new application
// @route POST /applications
// @access Private
const createNewApplication = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Application.findOne({ title }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate application title' })
    }

    // Create and store the new user 
    const application = await Application.create({ user, title, text })

    if (application) { // Created 
        return res.status(201).json({ message: 'New application created' })
    } else {
        return res.status(400).json({ message: 'Invalid application data received' })
    }

})

// @desc Update a application
// @route PATCH /applications
// @access Private
const updateApplication = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm application exists to update
    const application = await Note.findById(id).exec()

    if (!application) {
        return res.status(400).json({ message: 'Aapplication not found' })
    }

    // Check for duplicate title
    const duplicate = await application.findOne({ title }).lean().exec()

    // Allow renaming of the original application 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate application title' })
    }

    application.user = user
    application.title = title
    application.text = text
    application.completed = completed

    const updatedApplication = await application.save()

    res.json(`'${updatedApplication.title}' updated`)
})

// @desc Delete a application
// @route DELETE /applications
// @access Private
const deleteApplication = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Application ID required' })
    }

    // Confirm application exists to delete 
    const application = await Application.findById(id).exec()

    if (!application) {
        return res.status(400).json({ message: 'Application not found' })
    }

    const result = await application.deleteOne()

    const reply = `Application '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllApplications,
    createNewApplication,
    updateApplication,
    deleteApplication
}