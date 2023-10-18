const express = require('express')
const router = express.Router()
const applicationsController = require('../controllers/applicationsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(applicationsController.getAllApplications)
    .post(applicationsController.createNewApplication)
    .patch(applicationsController.updateApplication)
    .delete(applicationsController.deleteApplication)

module.exports = router