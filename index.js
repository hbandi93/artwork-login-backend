const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const fs = require('fs')
const data = require('./data.json')

app.use(express.json())
app.use(cors())

app.post('/', (req, res) => {
    data.push(req.body.url)
    fs.writeFileSync('./data.json', JSON.stringify(data, null, 4))
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})