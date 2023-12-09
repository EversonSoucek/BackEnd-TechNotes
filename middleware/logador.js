const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
const { log } = require('console')

const logaEventos = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "..", "logs"))
        }
        await fsPromises.appendFile(path.join(__dirname, "..", "logs", logFileName), logItem)
    } catch (err){
        console.log(err);
    }

}

const logador = (req,res,next) => {
    logaEventos(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}


module.exports = {logaEventos, logador}
