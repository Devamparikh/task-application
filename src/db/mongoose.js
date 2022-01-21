const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
})



// const me = new User({
//     name: 'John',
//     email: 'john@example.com',
//     password: 'password14'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })




// inserttask.save().then(() => {
//     console.log(inserttask)
// }).catch((error) => {
//     console.log(error)
// })