const express = require('express')
const app = express()
const port = 3000

const ScholarshipRouter = require('./routes/ScholarshipRouter')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('/scholarships', ScholarshipRouter)

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
 })

app.listen(port, () => {
    console.log('updscholarships server running')
})