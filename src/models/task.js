const mongoose = require('mongoose')
const validator = require('validator')
const taskSchema = new mongoose.Schema({
    description:{
        type: 'string',
        required: true,
        trim: true
    },
    complete:{
        type: 'boolean',
        default: false
    }
})

taskSchema.pre('save', async function (next) {
    const task = this

    if(task.isModified('password')) {
        task.password = await bcrypt.hash(task.password, 8)
    }
    
    next()
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
