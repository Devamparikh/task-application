const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const bcrypt = require('bcryptjs')


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})   
    } catch (error) {
        res.status(400).send(error) 
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.status(200).send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    console.log(updates)
    const allowedUsers = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUsers.includes(update))


    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid operation on update'})
    }
    try{
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        // const user = await User.findById(req.params.id)
    console.log(req.user['name'])
    console.log(updates)

        updates.forEach((update) => req.user[update] = req.body[update])
    console.log(req.user['name'])

        await req.user.save()

        res.status(200).send(req.user)
    } catch (e) {
    console.log(e)
        res.status(500).send(e)
    }
})

router.delete('/users/me', auth, async(req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send({error: 'Invalid user ID.'})
        // }

        await req.user.remove()
        res.status(200).send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router