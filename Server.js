require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logador,logaEventos } = require('./middleware/logador')
const manipuladorErro = require('./middleware/manipuladorErros')
const cookieParser = require('cookie-parser')
const cors = require('cors' )
const opcoesCors = require('./config/opcoesCors')
const conectadb = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV);

conectadb()

app.use(logador)

app.use(cors(opcoesCors))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root')),

app.use("/usuarios", require('./routes/usuarioRotas'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(manipuladorErro)
mongoose.connection.once("open", () =>{
    console.log("Conectado no mongodb");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err =>{
    console.log(err);
    logaEventos(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})  