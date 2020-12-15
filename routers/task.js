const express = require('express')
const router = new express.Router()
const Task = require('../models/task')


//Task Requests

//post task
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save(task)
        res.status(201).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

//ALL tasks
router.get('/tasks', async(req,res) => {

    const tasks = await Task.find({})

    try {
        res.status(200).send(tasks)
    } catch (error) {
        res.status(400).send(error)
    }
})

//INDIVIDUAL TASKS
router.get('/tasks/:id', async (req,res) => {
    const _id = req.params.id
    
    const task = await Task.findById(_id)
    try {
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)

    } catch (error) {
        res.status(500).send(error)
    }
})

//Update Task
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValid = updates.every((update) => allowedUpdates.includes(update)
    )

    if (!isValid) {
        return res.status(400).send({error: 'Invalid updates'})
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

// delete user 
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            res.status(404).send()
        }
        
        res.send(task)
    } catch (error) {
        res.send(500).send(error)
    }
})

module.exports = router