const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const bcrypt = require('bcryptjs')


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.status(200).send(user)   
    } catch (error) {
        res.status(400).send(error) 
    }
})

router.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const users = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUsers = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUsers.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid operation on update'})
    }
    try{
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        const user = await User.findById(req.params.id)
        updates.foreach((update) => user[update] = req.body[update])
        await user.save()

        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send({error: 'Invalid user ID.'})
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router