const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    schoolId: {
        type: String,
        required: true
    },
    schoolName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Please Enter your email Address"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Enter the password"],
        minLength:[8,"Minimum 8 character required in password"]  
    },
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "admin"
    },
    contact: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('AdminInfo', adminSchema)

