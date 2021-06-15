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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

app.get('/api/endpointtest', (req, res) => {
    badFunction(req)
})




const port = process.env.PORT || 4545

app.use(rollbar.errorHandler())
rollbar.log("Hello world!")

app.listen(port, () => console.log(`running on port: ${port}`))