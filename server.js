const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const app = express()

aws.config.region = 'ap-southeast-1'
const PORT = process.env.PORT || 3000
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/updscholarships_db'
const S3_BUCKET = process.env.S3_BUCKET;

mongoose.Promise = global.Promise
mongoose.connect(mongoUri)

const ScholarshipRouter = require('./routes/ScholarshipRouter')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/scholarships', ScholarshipRouter)

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
 })

app.listen(PORT, () => {
    console.log('updscholarships server running')
})
