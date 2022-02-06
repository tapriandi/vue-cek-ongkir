const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000
const apiRouter = require('./routes/api')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', apiRouter)

app.listen(PORT, () => console.log(`App listening on ${PORT}`))
