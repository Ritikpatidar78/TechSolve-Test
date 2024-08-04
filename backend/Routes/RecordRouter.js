const { Router } = require("express");
const { DeleteRecord, EditRecord, GetRecords, GetSingleRecord, UploadFile, DownloadRecord } = require("../Controllers/RouteController");
const uploads = require("../middleware/multer");

const router = Router()


//data router with different parameters
router.get("/",GetRecords)
router.get("/singleRecord",GetSingleRecord)
router.get("/download",DownloadRecord)
router.post("/file",uploads.single("file"),UploadFile)
router.put("/:id",EditRecord)
router.delete("/:id",DeleteRecord)

module.exports = router