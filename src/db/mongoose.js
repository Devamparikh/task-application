const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
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