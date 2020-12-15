const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const { ObjectID } = require('mongodb')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//User Requests
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//ALL users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Individual users
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.send(404).send()
        }
        res.send(user)
    } catch (error) {
        res.send(500).send(error)
    }
})    


//Task Requests

//post task
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save(task)
        res.status(201).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

//ALL tasks
app.get('/tasks', async(req,res) => {

    const tasks = await Task.find({})

    try {
        res.status(200).send(tasks)
    } catch (error) {
        res.status(400).send(error)
    }
})

//INDIVIDUAL TASKS
app.get('/tasks/:id', async (req,res) => {
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



app.listen(port, () => {
    console.log('server is on port ' + port)
})