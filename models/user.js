const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive')
            }
        },
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('get a better password')
            }
        }
    }
})


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email})

    if (!user) {
        throw new Error('User does not exist')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return (user)
}


// Password Hasher
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User