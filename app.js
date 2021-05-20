const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
//routers
const { ParserRouter } = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', ParserRouter)


app.listen(5000, () => {
    console.log('server start 5000')
})
