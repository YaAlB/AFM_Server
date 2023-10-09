const express = require('express')
const router = express.Router()
const applicationsController = require('../controllers/applicationsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(applicationsController.getAllApplications)
    .post(applicationsController.createNewApplications)
    .patch(applicationsController.updateApplications)
    .delete(applicationsController.deleteApplications)

module.exports = router