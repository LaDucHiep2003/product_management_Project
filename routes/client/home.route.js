const express = require('express')

const router = express.Router()
const controller = require('../../controllers/client/home.controller')
const categoryMiddleware = require("../../middlewares/client/category.middleware")

router.get('/',categoryMiddleware.category, controller.index)
              

module.exports = router;