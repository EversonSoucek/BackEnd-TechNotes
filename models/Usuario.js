const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    nomeUsuario: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    cargo: [{
        type: String,
        default:"Funcionário"
    }],
    ativo: {
        type: Boolean,
        default:true
    }
})

module.exports = mongoose.model('Usuario',usuarioSchema)