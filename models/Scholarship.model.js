const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Scholarship = new Schema({
    name: {
        type: String
    }
},{
    collection: 'scholarships'
})

module.exports = mongoose.model('Scholarship', Scholarship)
