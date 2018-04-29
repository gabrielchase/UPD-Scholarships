const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Scholarship = new Schema({
    name: {
        type: String
    },
    offering_unit: {
        type: String
    },
    minimum_gwa: {
        type: Number
    },
    minimum_units_required: {
        type: Number
    },
    allowed_bad_grades: {
        4: {
            type: Boolean
        },
        5: {
            type: Boolean
        },
        drop: {
            type: Boolean
        },
        inc: {
            type: Boolean
        }
    },
    total_receivable: {
        type: Number
    },
    exclusive_courses: {
        type: [String]
    },
    additional_information: {
        type: String
    },
    file_link: {
        type: String
    },
    detail_link: {
        type: String
    }
},{
    collection: 'scholarships'
})

module.exports = mongoose.model('Scholarship', Scholarship)
