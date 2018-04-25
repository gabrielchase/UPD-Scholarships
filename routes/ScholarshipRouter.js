const express = require('express')
const app = express()
const _ = require('lodash')

const ScholarshipRouter = express.Router()
const Scholarship = require('../models/Scholarship.model')

ScholarshipRouter.route('/').get(async function(req, res) {
    let context = {}
    let scholarships = []

    if (_.isEmpty(req.query)) {
        try {
            console.log('in here')
            scholarships = await Scholarship.find()
        } catch(err) {
            console.log(err)
        }   
    }
    
    if (req.query) {
        try {
            let name = req.query.name
            context.name = name
            
            if (name) {
                scholarships = await Scholarship.find({name: {$regex: name, $options: 'i'}})
            }
        } catch(err) {
            console.log(err)
        }
    }

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
