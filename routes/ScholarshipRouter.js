const express = require('express')
const app = express()
const ScholarshipRouter = express.Router()

ScholarshipRouter.route('/').get(function(req, res) {
    res.render('index')
})

ScholarshipRouter.route('/create').get(function(req, res) {
    res.render('create_scholarships')
})

module.exports = ScholarshipRouter
