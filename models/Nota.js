const mongoose = require('mongoose')
const autoIncrementa = require('mongoose-sequence')(mongoose)


const notaSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    titulo: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    completo: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)

notaSchema.plugin(autoIncrementa,{
    inc_field:'ticket',
    id:'ticketNums',
    start_seq:500
})

module.exports = mongoose.model('Nota', notaSchema)