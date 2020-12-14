const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const { ObjectID } = require('mongodb')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//User Requests
app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        console.log(res.send(user))
    }).catch((err) => {
        res.status(400).send(err)
    })
})

//ALL users
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

//Individual users
app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    }).catch(() => {
        res.send(500).send()
    })
})


//Task Requests
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        console.log(res.send(task))
    }).catch((err) => {
        res.status(400).send(err)
    })
})

//ALL tasks
app.get('/tasks', (req,res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch(() => {
        res.status(500).send()
    })
})

//INDIVIDUAL TASKS
app.get('/tasks/:id', (req,res) => {
    const _id = req.params.id
    Task.findById(_id).then((task) => {
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch(() => {
        res.status(500).send()
    })
})



app.listen(port, () => {
    console.log('server is on port ' + port)
})