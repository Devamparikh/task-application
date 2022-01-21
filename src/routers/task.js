const express = require('express')
const Task = require('../models/task')
const router = new express.Router()


router.post('/tasks', async(req, res) => {   
    const task = new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    
    try{
        const task = await Task.find({})
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
    
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'complete']
    const isValidOperation = update.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(404).send({error: 'Invalid operation on update'})
    }
    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] =  req.body[update])
        await task.save()

        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send()
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send({error: 'Invalid task ID.'})
        }
        res.status(200).send(task)
    }catch(error) {
        res.status(500).send()
    }
})


module.exports = router