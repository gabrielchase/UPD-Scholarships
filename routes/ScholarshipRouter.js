const express = require('express')
const app = express()

const ScholarshipRouter = express.Router()
const Scholarship = require('../models/Scholarship.model')

ScholarshipRouter.route('/').get(function(req, res) {
    Scholarship.find(function(err, scholarships) {
        if (err) {
            console.log(err)
        } else {
            res.render('index', {scholarships: scholarships})
        }
    })
})

ScholarshipRouter.route('/create').get(function(req, res) {
    res.render('create_scholarships')
})

ScholarshipRouter.route('/post').post(function(req, res) {
    const scholarship = new Scholarship(req.body)
    scholarship.save()
        .then(scholarship => {
            res.redirect('/scholarships')        
        })
        .catch(err => {
            res.status(400).send('Unable to save to the database')
        })
})

module.exports = ScholarshipRouter
