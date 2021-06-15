const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')
let rollbar = new Rollbar({
    accessToken:'221c318ba58542baab4df61a487738e0',
    captureUncaught: true,
    captureUnhandledRejections: true
})


const app = express()

app.use(express.json())
app.use('/style', express.static('./public/styles.css'))



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

app.get('/api/endpointtest', (req, res) => {
    badFunction(req)
})

app.get('/api/warning', (req, res) => {
    rollbar.warning('warning message here')
})

app.get('/api/critical', (req, res) => {
    rollbar.critical('critical message here')
})

//Added Feature - what we did in class(extra practice)

let students = []

app.post('/api/student', (req, res) => {
    let {name} = req.body

    let index = students.findIndex((studentName) => {
        studentName === name
    })

    if (index === -1 && name !== '') {
        students.push(name)
        rollbar.log('student added successfully', {author: 'annie', type: 'manual'})
        res.status(200).send(students)
    } else if (name === '') {
        rollbar.error('no name given')
        res.status(400).send('must provide name')
    } else {
        rollbar.error('student already exists')
        res.status(400).send('that student already exists')
    }
})


const port = process.env.PORT || 4545

app.use(rollbar.errorHandler())
rollbar.log("Hello world!")

app.listen(port, () => console.log(`running on port: ${port}`))