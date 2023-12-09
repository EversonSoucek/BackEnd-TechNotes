const express = require('express')
const router = express.Router()
const path = require('path')

//Regex corresponde a raiz do site podendo receber um index com uma extensão opcional "".html"
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router