const Usuario = require('../models/Usuario')
const Nota = require('../models/Nota')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


const getUsuarios = asyncHandler(async (req, res) => {
    const usuarios = await User.find().select('-password').lean()
    if (!usuarios) {
        return res.status(400).json({ message: "Nenhum usuário achado" })
    }
    res.json(usuarios)
})

const postUsuario = asyncHandler(async (req, res) => {
    const { nomeUsuarios, senha, cargo, } = req.body

    if (!username || !password || !Array.isArray(cargo) || !cargo.length) {
        return res.status(400).json({ message: 'Todos campo são obrigatórios' })
    }

    const TemDuplicado = await Usuario.findOne({ username }).lean().exec()

    if (TemDuplicado) {
        return res.status(409).json({ message: 'Nome de usuário duplicado' })
    }

    const senhaHashed = await bcrypt.hash(senha, 10)
    /* O 10 ali é a quantidade de vezes que vai passar no round de salt,
    onde vai acrescentar sequências aleatórios na senha para aumentar a segurança*/


    const objetoUsuario = { usuario, "senha": senhaHashed, cargo }

    const usuario = await User.create(objetoUsuario)

    if (usuario) {
        res.status(201).json({ message: `Novo usuário criado ${usuario}` })
    }
    else {
        res.status(400).json({ message: 'Dados de usuário invalidos' })
    }

})
const updateUsuario = asyncHandler(async (req, res) => {
    const { id, nomeUsuario, cargo, ativo, senha } = req.body

    if (!id || nomeUsuario || Array.isArray(cargo) || !cargo.length || typeof ativo !== 'boolean') {
        return res.status(400).json({ message: "Todos campos são obirgatórios" })
    }

    const usuario = await Usuario.findById(id).exec()

    if (!user) {
        return res.status.json({ message: 'Usuário não encontrado' })
    }

    const temDuplicado = await Usuario.findOne({ nomeUsuario }).lean().exec()

    if (temDuplicado && temDuplicado?._id.toString() !== id) {
        return res.status(409).json({ message: "Nome de usuário duplicado" })
    }


    usuario.nomeUsuario = nomeUsuario
    usuario.cargo = cargo
    usuario.ativo = ativo

    if(senha) {
        user.senha = await bcrypt.hash(senha,10)
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

    const notas = await Nota.FindOne({ usuario:id}).lean.exec()
    if (notes?.length) {
        return res.status(400).json({message:'Usuario tem notas designadas'})
    }

const usuario = await Usuario.findById(id).exec()

if (!usuario) {
    return res.status(400).json({message:"Usuario não encontrado"})
}

const resultado = await Usuario.deleteOne()

const resposta = `Nome de usuario ${resultado.nomeUsuario} de ID ${result._id} deletado`

res.json(resposta)

})

module.exports = {
    getUsuarios,
    postUsuario,
    updateUsuario,
    deleteUsuario
}