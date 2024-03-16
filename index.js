const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return response.status(404).json({ error: "usernot found" })
    }

    request.userIndex = index
    request.userId= id
    next()
}



app.get('/users', (request, response) => {
    return response.json({ users })
})
app.post('/users', (request, response) => {
    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age }
    users.push(user)
    return response.status(201).json(user)

})
app.put('/users/:id', checkUserId, (request, response) => {

    const { name, age } = request.body
    const index = request.user.Index
    const updatedUser = { id, name, age }
    if (index < 0) {
        return response.status(404).json({ message: "user not found" })
    }
    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {

    const index = request.user.Index

    if (index < 0) {
        return response.status(404).json({ message: "user not found" })
    }

    users.splice(index, 1)


    return response.status(204).json()
})



app.listen(port, () => {
    console.log('serve started on port ${port}')
})
