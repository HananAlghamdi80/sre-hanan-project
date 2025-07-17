const express = require('express')
const app = express()
app.get('/', (req, res) => res.send('API Service Hanan Running'))
app.listen(3000, () => console.log('API Service on port 3000'))
