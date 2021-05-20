const { Router } = require('express')
const router = Router()
//controllers
const { ParserController } = require('../controllers')
//middlewares
const { checkFile } = require('../middlewares')


router.post('/parser', checkFile, ParserController.createJSON)

module.exports = router
