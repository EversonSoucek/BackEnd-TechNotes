const mongoose = require('mongoose')

const conectadb = async (err) => {
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }
    catch{
        console.log(err);
    }
}

module.exports = conectadb