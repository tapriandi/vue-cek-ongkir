const express = require('express')
const router = express.Router()
const axios = require('axios')

require('dotenv').config()

// config default axios
axios.defaults.baseURL=process.env.API_URL
axios.defaults.headers.common['key']=process.env.API_KEY
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencode'

// get city
router.get('/city', (req, res) => {
  axios.get(`/city`)
    .then(data => res.json(data.data))
    .catch(error => res.send(error))
})

router.post('/cost', (req, res) => {
  axios.post('/cost', req.body )
    .then(data => res.json(data.data))
    .catch(error => res.send(error))
})

module.exports = router
