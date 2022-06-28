const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env'})
const mongoose = require('mongoose')
const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, { useNewUrlParser: true }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })
}
module.exports = connectDatabase