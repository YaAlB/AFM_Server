const Application = require('../models/Application')

const asyncHandler = require('express-async-handler')

// @desc Get all applications 
// @route GET /applications
// @access Private
const getAllApplications = asyncHandler(async (req, res) => {
    const { id } = req

    // Get all applications from MongoDB by user Id
    const applications = await Application.find({userId: id}).lean()

    // If no application 
    if (!applications?.length) {
        return res.status(400).json({ message: 'No applications found' })
    }

    res.json(applications)
})

// @desc Create new application
// @route POST /applications
// @access Private
const createNewApplication = asyncHandler(async (req, res) => {
    const { title, financeType, newUsedType, assetCost, deposit, financeAmount, companyName, 
        tradingName, ABN, fullName, address, addressState, postCode, licence, cash, propertiesValue, 
        vehiclesAmount, sharesTermDeposits, homeMortgage, otherMortgage, creditCard, otherLiabilities } = req.body

    // Confirm data
    if (!title || !financeType || !newUsedType || isNaN(assetCost) || isNaN(deposit) || isNaN(financeAmount) || !companyName || 
        !tradingName || isNaN(ABN) || !fullName || !address || !addressState || isNaN(postCode) || isNaN(licence) || isNaN(cash) ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Application.findOne({ title }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate application title' })
    }

    const applicationObject = { userId: req.id, title, financeType, newUsedType, assetCost, deposit, 
        financeAmount, companyName, tradingName, ABN, fullName, address, addressState, postCode, licence, cash, 
        propertiesValue, vehiclesAmount, sharesTermDeposits, homeMortgage, otherMortgage, creditCard, 
        otherLiabilities }

    // Create and store the new application 
    const application = await Application.create(applicationObject)

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
    const { id, title, financeType, newUsedType, assetCost, deposit, financeAmount, companyName, 
        tradingName, ABN, fullName, address, addressState, postCode, licence, cash, propertiesValue, 
        vehiclesAmount, sharesTermDeposits, homeMortgage, otherMortgage, creditCard, otherLiabilities } = req.body

        

    // Confirm data
    if (!id || !financeType || !newUsedType || isNaN(assetCost) || isNaN(deposit) || isNaN(financeAmount) || !companyName || 
    !tradingName || isNaN(ABN) || !fullName || !address || !addressState || isNaN(postCode) || isNaN(licence) || isNaN(cash)) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm application exists to update
    const application = await Application.findById(id).exec()

    if (!application) {
        return res.status(400).json({ message: 'Application not found' })
    }

    // Check for duplicate title
    const duplicate = await Application.findOne({ title }).lean().exec()

    // Allow renaming of the original application 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate application title' })
    }

    application.title = title
    application.financeType = { value: financeType.value, label: financeType.label }
    application.newUsedType = { value: newUsedType.value, label: newUsedType.label }
    application.assetCost = assetCost
    application.deposit = deposit
    application.financeAmount = financeAmount
    application.companyName = companyName
    application.tradingName = tradingName
    application.ABN = ABN
    application.fullName = fullName
    application.address = address
    application.addressState = { value: addressState.value, label: addressState.label }
    application.postCode = postCode
    application.licence = licence
    application.cash = cash
    application.propertiesValue = propertiesValue
    application.vehiclesAmount = vehiclesAmount
    application.sharesTermDeposits = sharesTermDeposits
    application.homeMortgage = homeMortgage
    application.otherMortgage = otherMortgage
    application.creditCard = creditCard
    application.otherLiabilities = otherLiabilities
    
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