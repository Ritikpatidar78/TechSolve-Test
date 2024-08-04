const asyncHandler = require("express-async-handler")
const Record = require("../Models/Record")
const fs = require('fs');
const { parse } = require("csv-parse");
const jsoncsv = require('json-csv');
const path = require("path");

const PAGE_SIZE = 20


const GetSingleRecord = asyncHandler(async(req,res)=>{
    const _id = req.query.id
    if(!_id) {
        res.status(400)
        throw new Error("Send ID")
    }
    const record = await Record.findOne({ _id })
    if(record){
        res.status(200).json({
            success: true,
            record
        })
    }
    else {
        res.status(400)
        throw new Error("Record not Found")
    }
}) 


//controller for upload csv file and convert it to json
const UploadFile = asyncHandler(async(req,res)=>{
    if(!req.file){
        res.status(400)
        throw new Error("Please Upload File")
    }
    fs.createReadStream(req.file.path).pipe(parse({delimiter:",", from_line: 2})).on("data", function (row) {
        Record.create({name: row[0], email: row[1], phone: row[2], address: row[3] })
      }).on("end", ()=>{
        res.status(200).json({success:true})
        fs.unlink(req.file.path, ()=>{})
      })

}) 

//controller to download csv file of all data
const DownloadRecord = asyncHandler(async(req,res)=>{
    const data = await Record.find()
    const buffer =  await jsoncsv.buffered([...data],{
        fields: [
            { name: 'name', label: 'name' },
            { name: 'email', label: 'email' },
            { name: 'phone', label: 'phone' },
            { name: 'address', label: 'address' }
        ]
    })

    const FilePath = path.join(__dirname, '../../downloads', `${Math.random().toString()}.csv`)
    fs.writeFile(FilePath, buffer, ()=>{
    res.sendFile(FilePath)
    })


})    

//controller for get all the data
 const GetRecords = asyncHandler(async(req,res)=>{
    const page = req.query.page
    if(!page){
        res.status(400)
        throw new Error("Invalid")
    }
    const records = await Record.find().skip((page-1)*PAGE_SIZE).limit(PAGE_SIZE)
    res.status(200).json(records)
})


//controller for edit the respective data
 const EditRecord = asyncHandler(async(req,res)=>{
    const { name, email, phone, address  } = req.body
    const record = await Record.findOne({_id: req.params.id})
    if(!record){
        res.status(400)
        throw new Error("Record not Found")
    }
    else {
        record.name = name
        record.email = email
        record.phone = phone
        record.address = address
        await record.save()
    }
    res.status(200).json(record)
})

//controller for delete the respective data
 const DeleteRecord = asyncHandler(async(req,res)=>{
    const record = await Record.findOne({_id: req.params.id})
    if(!record){
        res.status(400)
        throw new Error("No data Found")
    }

    await Record.findByIdAndDelete(req.params.id)
    res.status(200).json({success: "true"})
})

module.exports = {UploadFile,DownloadRecord,EditRecord,DeleteRecord,GetRecords, GetSingleRecord,}