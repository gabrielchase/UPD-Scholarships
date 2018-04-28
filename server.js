require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const app = express()

aws.config.region = 'ap-southeast-1'
const PORT = process.env.PORT || 3000
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/updscholarships_db'
const S3_BUCKET = process.env.S3_BUCKET

mongoose.Promise = global.Promise
mongoose.connect(mongoUri)

const ScholarshipRouter = require('./routes/ScholarshipRouter')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/scholarships', ScholarshipRouter)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})

app.get('/sign-s3', (req, res) => {
    const s3 = new aws.S3()
    const fileName = req.query['file-name'].replace(/ /g,'+')
    const fileType = req.query['file-type']
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60, 
        ContentType: fileType, 
        ACL: 'public-read'
    }

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err)
            return res.end()
        } 
        console.log(data)
        const returnedData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
            downloadUrl: `https://s3-ap-southeast-1.amazonaws.com/${S3_BUCKET}/${fileName}`
        }
        res.write(JSON.stringify(returnedData))
        res.end()
    })

})

app.listen(PORT, () => {
    console.log('updscholarships server running')
})
