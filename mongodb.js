const {MongoClient, ObjectID} = require('mongodb')
// const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to DB. ' + error)
    }

    const db = client.db(databaseName)
//     db.collection('tasks').insertMany([
//         {
//             description: 'Clean the house',
//             complete: true
//         },{
//             description: 'Renew inspection',
//             complete: false
//         },{
//             description: 'Pot plants',
//             complete: false
//         }
//     ], (error, result) => {
//         if(error) {
//             return console.log('Unable to insert tasks: ' + error)
//         }
//         console.log(result.ops)
//     })


    // db.collection('tasks').findOne( { _id: new ObjectID("61e4c9d16831363034d19cbd") }, (error, task) => {
    //     if(error) { return console.log('Unable to find task: ' + error)}
    //     console.log(task)
    // })

    // db.collection('tasks').find({ complete:false}).toArray((error, task) => {
    //     console.log(task)
    // })


    const updatePromises = db.collection('tasks').updateOne({ 
        _id: new ObjectID("61e4c9d16831363034d19cbd")
    },{
        $set: {
            description: 'Task update one.'
        }
    })
  
    updatePromises.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})