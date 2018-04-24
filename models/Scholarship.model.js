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
            type: Boolean,
            default: true
        },
        5: {
            type: Boolean,
            default: true
        },
        drop: {
            type: Boolean,
            default: true
        },
        inc: {
            type: Boolean,
            default: true
        }
    },
    total_receivable: {
        type: Number
    },
    additional_information: {
        type: String
    }
},{
    collection: 'scholarships'
})

module.exports = mongoose.model('Scholarship', Scholarship)
