const express = require('express')
const app = express()

const ScholarshipRouter = express.Router()
const Scholarship = require('../models/Scholarship.model')

const { COURSES } = require('../courses')

ScholarshipRouter.route('/').get(async function(req, res) {
    let query = {}
    let context = {
        scholarships: [],
        name: req.query.name,
        gwa: req.query.gwa,
        course: req.query.course,
        amount_required: req.query.amount_required,
        courses: COURSES
    }

    if (context.name) {
        query.name = {$regex: context.name, $options: 'i'}
    }

    if (context.gwa) {
        query.minimum_gwa = {$gte: context.gwa}
    }

    if (context.amount_required) {
        query.total_receivable = {$gte: context.amount_required}
    }

    if (context.course && context.course != 'Any Course') {
        query.exclusive_courses = context.course
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
    res.render('create_scholarships', {courses: COURSES})
})

ScholarshipRouter.route('/post').post(async function(req, res) {
    try {
        const scholarship = new Scholarship(req.body)
        await scholarship.save()
        const detail_link = `/scholarships/${scholarship._id}`
        await Scholarship.update({_id: scholarship._id}, {detail_link: detail_link})
        res.redirect(detail_link)        
    } catch (err) {
        console.log(err)
        res.status(400).send('Unable to save to the database')
    }
})

ScholarshipRouter.route('/:id').get(async function(req, res) {
    const id = req.params.id
    const scholarship = await Scholarship.findById(id)
    res.render('detail_scholarship', {scholarship: scholarship})
})

ScholarshipRouter.route('/:id/edit').get(async function(req, res) {
    const id = req.params.id
    const scholarship = await Scholarship.findById(id)
    // console.log(scholarship.allowed_bad_grades['4'])
    res.render('update_scholarship', {scholarship: scholarship, courses: COURSES})
})

ScholarshipRouter.route('/:id/update').post(async function(req, res) {
    const id = req.params.id
    const scholarship = await Scholarship.findById(id)
    console.log(req.body)
    // res.render('detail_scholarship', {scholarship: scholarship})
})

module.exports = ScholarshipRouter
