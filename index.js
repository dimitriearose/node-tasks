const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const jwt = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('server is on port ' + port)
})


const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' },'thisisatest', { expiresIn: '7 days' })
    console.log(token)

    const data =jwt.verify(token, 'thisisatest')
    console.log(data)
}


myFunction()