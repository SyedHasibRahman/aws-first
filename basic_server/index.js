const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World from aws & port removed by nginx  work correctly 1!')
})

app.listen(port, () => {
    console.log(`Example app listening 1 on port ${port}!`)
})