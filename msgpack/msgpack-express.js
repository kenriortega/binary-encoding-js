'use strict'

const express = require('express')
const { default: msgpack } = require('express-msgpack')
const app = express()
app.use(msgpack())

app.post('/decode', (req, res) => {
    // http POST http://localhost:5000/decode Accept:application/msgpack Content-Type:application/msgpack @msgpack\package-msgpack.dat
    const body = req.body
    res.send(body)
})
app.get('/encode', (req, res) => {
    // http http://localhost:5000/encode Accept:application/msgpack
    res.json({ hello: 'MNTD' })
})


app.listen(5000, () => console.log(`Server running on port 5000`))
