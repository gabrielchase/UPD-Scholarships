const express = require('express')
const app = express()
const _ = require('lodash')

const ScholarshipRouter = express.Router()
const Scholarship = require('../models/Scholarship.model')

const { COURSES } = require('../courses')

ScholarshipRouter.route('/').get(async function(req, res) {
    let query = {}
    let context = {
        scholarships: [],
        name: req.query.name,
        gwa: req.query.gwa,
        courses: COURSES
    }

    if (context.name) {
        query.name = {$regex: context.name, $options: 'i'}
    }

    if (context.gwa) {
        query.minimum_gwa = {$gte: context.gwa}
    }

    let scholarships = await Scholarship.find(query)

    if (scholarships) {
        context.scholarships = scholarships
        res.render('index', context)
    } else {
        console.log('bad')
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
