const mongoose = require('mongoose');
const validator = required('validator')

const userSchema = new mongoose.userSchema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true
    },
    about: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        validate: {
            validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
            message: 'Must be a Valid URL'
            }
    }
})

module.exports = mongoose.model('user', userSchema)