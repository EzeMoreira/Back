const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const mongoUri = process.env.MONGO_URI

mongoose.set("strictQuery", true)

mongoose
    .connect(mongoUri, { useNewUrlParser: true })
    .then(() => console.log("DB CONECTADA"))
    .catch(err => console.log("ERROR: " + err))