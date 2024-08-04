const  mongoose  = require("mongoose");


// mongoose scheme for database
const RecordSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
},{
    timestamps: true,
})

module.exports = mongoose.model("Record", RecordSchema)
