//constants
const { MIMETYPE_CSV } = require('../constants')

module.exports = (req, res, next) => {
    const { file } = req.files

    if(MIMETYPE_CSV.includes(file.mimetype)) {
        next()
    } else return next(new Error())

}
