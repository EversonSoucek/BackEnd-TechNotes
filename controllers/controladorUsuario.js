const Usuario = require('../models/Usuario')
const Nota = require('../models/Nota')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


const getUsuarios = asyncHandler(async (req, res) => {
    const usuarios = await Usuario.find().select('-password').lean()
    if (!usuarios?.length) {
        return res.status(400).json({ message: "Nenhum usuário achado" })
    }
    res.json(usuarios)
})

const postUsuario = asyncHandler(async (req, res) => {
    const { nomeUsuario, senha, cargo, } = req.body

    if (!nomeUsuario || !senha || !Array.isArray(cargo) || !cargo.length) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
    }

    const TemDuplicado = await Usuario.findOne({ nomeUsuario }).lean().exec()

    if (TemDuplicado) {
        return res.status(409).json({ message: 'Nome de usuário duplicado' })
    }

    const senhaHashed = await bcrypt.hash(senha, 10)
    /* O 10 ali é a quantidade de vezes que vai passar no round de salt,
    onde vai acrescentar sequências aleatórios na senha para aumentar a segurança*/


    const objetoUsuario = { nomeUsuario, "senha": senhaHashed, cargo }

    const usuario = await Usuario.create(objetoUsuario)

    if (usuario) {
        res.status(201).json({ message: `Novo usuário criado ${usuario}` })
    }
    else {
        res.status(400).json({ message: 'Dados de usuário invalidos' })
    }

})
const updateUsuario = asyncHandler(async (req, res) => {
    const { id, nomeUsuario, cargo, ativo, senha } = req.body

    if (!id || !nomeUsuario || !Array.isArray(cargo) || !cargo.length || typeof ativo !== 'boolean') {
        return res.status(400).json({ message: "Todos campos são obrigatórios" })
    }
    
    
    const usuario = await Usuario.findById(id).exec()

    if (!usuario) {
        return res.status(400).json({ message: 'Usuário não encontrado' })
    }

    const temDuplicado = await Usuario.findOne({ nomeUsuario }).lean().exec()

    if (temDuplicado && temDuplicado?._id.toString() !== id) {
        return res.status(409).json({ message: "Nome de usuário duplicado" })
    }


    usuario.nomeUsuario = nomeUsuario
    usuario.cargo = cargo
    usuario.ativo = ativo

    if(senha) {
        usuario.senha = await bcrypt.hash(senha,10)
         /* O "10" ali é a quantidade de vezes que vai passar no round de salt,
        onde vai acrescentar sequências aleatórios na senha para aumentar a segurança*/
    }

    const usuarioUpdated = await usuario.save()

    res.json({message: `Atualizado`})    

})

const deleteUsuario = asyncHandler(async (req, res) => {
    const {id} = req.body

    if(!id) {
        return res.status(400).json({message:"Id é obrigatório"})
    }

    /*const nota = await Nota.findOne({ usuario:id}).lean().exec()
    if (nota?.length) {
        return res.status(400).json({message:'Usuario tem notas designadas'})
    }*/

const usuario = await Usuario.findById(id).exec()

if (!usuario) {
    return res.status(400).json({message:"Usuario não encontrado"})
}

const resultado = await usuario.deleteOne()

const resposta = `Nome de usuario ${resultado.nomeUsuario} de ID ${resultado._id} deletado`

res.json(resposta)

})

module.exports = {
    getUsuarios,
    postUsuario,
    updateUsuario,
    deleteUsuario
}


//TERMINAR DE VER O VÍDEO