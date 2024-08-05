const  mongoose  = require("mongoose");


// mongoose scheme for database
const RecordSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true,default: ""},
    phone: {type: String, required: true, default: ""},
    address: {type: String, required: true , default: ""},
},{
    timestamps: true,
})

module.exports = mongoose.model("Record", RecordSchema)
