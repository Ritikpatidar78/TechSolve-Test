const mongoose = require("mongoose");

//data base connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database is running at port ${conn.connection.port}`)

    } catch (error) {
        console.log(error.message)
    }

}

module.exports = connectDB;