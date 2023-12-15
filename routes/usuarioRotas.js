const express = require('express')
const router = express.Router()
const controladorUsuario = require('../controllers/controladorUsuario')

router.route('/')
    .get(controladorUsuario.getUsuarios)
    .post(controladorUsuario.postUsuario)
    .patch(controladorUsuario.updateUsuario)
    .delete(controladorUsuario.deleteUsuario)



module.exports = router