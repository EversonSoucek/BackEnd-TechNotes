const origensPermitidas = require('./origensPermitidas')

const opcoesCors = {
    origin: (origin, callback) => {
        if (origensPermitidas.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }
        else{
            callback(new Error("Não permitido pelo cors"))
        }
    },
    credentials: true, 
    optionsSucessStatus:200
}

module.exports = opcoesCors