const express = require('express')
const app = express()

const ScholarshipRouter = express.Router()
const Scholarship = require('../models/Scholarship.model')

ScholarshipRouter.route('/').get(async function(req, res) {
    const scholarships = await Scholarship.find()
    if (scholarships) {
        res.render('index', {scholarships: scholarships})
    } else {
        console.log(err)
    }
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

ScholarshipRouter.route('/:id').get(async function(req, res) {
    const id = req.params.id
    const scholarship = await Scholarship.findById(id)
    res.render('detail_scholarship', {scholarship: scholarship})
})

module.exports = ScholarshipRouter
