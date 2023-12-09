const { logaEventos} = require('./logador')

const manipuladorErro = (err, req, res, next) =>{
    logaEventos(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    console.log(err.stack)


    const status = res.statusCode ? res.statusCode : 500 //erro de servidor

    res.status(status)

    res.json({message: err.message})
    
}

module.exports = manipuladorErro
