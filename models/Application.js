const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        financeType: {
            type: { 'value': String,  'label': String },
            default: "Lease"
        },
        newUsedType: {
            type: { 'value': String,  'label': String },
            default: "New"
        },
        title: {
            type: String,
            required: true
        },
        assetCost: {
            type: Number,
            required: true
        },
        deposit: {
            type: Number,
            required: true
        },
        financeAmount: {
            type: Number,
            required: true
        },
        companyName: {
            type: String,
            required: true
        },
        tradingName: {
            type: String,
            required: true
        },
        ABN: {
            type: Number,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        addressState: {
            type: { 'value': String,  'label': String },
            required: true
        },
        postCode: {
            type: Number,
            required: true
        },
        licence: {
            type: Number,
            required: true
        },
        cash: {
            type: Number,
            required: true
        },
        propertiesValue: {
            type: Number,
            required: false
        },
        vehiclesAmount: {
            type: Number,
            required: false
        },
        sharesTermDeposits: {
            type: Number,
            required: false
        },
        otherMortgage: {
            type: Number,
            required: false
        },
        homeMortgage: {
            type: Number,
            required: false
        },
        creditCard: {
            type: Number,
            required: false
        },
        otherLiabilities: {
            type: Number,
            required: false
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Application', applicationSchema)