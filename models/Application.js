const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const applicationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        salesPerson: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        birthDate: {
            type: Date,
            required: true
        },
        mobileNumber: {
            type: Number,
            required: true
        },
        email: {
            type: Number,
            required: true
        },
        dependentsNumber: {
            type: Number,
            required: true
        },
        timeAtResident: {
            type: Number,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

applicationSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Application', applicationSchema)