import React, { useRef, useState } from 'react'
import papaparse from 'papaparse'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader'


const Upload = () => {
    const input = useRef()
    const [loading, setLoading] = useState(false)
    const [fileName, setFileName] = useState("")
    const [file, setFile] = useState(null)
    const [records, setRecords] = useState([])
    const navigate = useNavigate()


    const API_URL = `${import.meta.env.VITE_SERVER_URL}/techsolvo/api/file`

    const Upload = async () => {
        setLoading(true)
        if (!file) return alert("Upload File")
        const form = new FormData()
        form.append("file", file)
        const response = await axios.post(API_URL, form, {
            headers: {
                "content-type": "multipart/form-data",
            }
        })
        if (response.status === 200) {
            setLoading(false)

            navigate("/")
        }
    }

    const handleFile = file => {
        if (file.type !== "text/csv") {
            return alert("Please Upload CSV File")
        }
        setFile(file)
        papaparse.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                setFileName(file.name)
                setRecords(results.data);
            }
        })
    }


    return (
        <div className='w-100 p-2 p-md-4'>
            <div className='d-flex w-100 align-items-start justify-content-between'>
                <h5>Upload File</h5>
                <div className='col-6 col-md-3 p-2 border rounded' hidden>
                    <input ref={input} onChange={e => {
                        handleFile(e.target.files[0])
                    }} multiple={false} type="file" accept='text/csv' className="form-control-file" />
                </div>
            </div>
            <div className='w-100 text-center'>
                <div onDragOver={(e) => {
                    e.preventDefault()
                }} onDrop={(e) => {
                    e.preventDefault()
                    handleFile(e.dataTransfer.files[0])
                }} onClick={() => {
                    input.current?.click()
                }} style={{ cursor: 'pointer' }} className='d-flex col-12 col-md-5 mx-auto align-items-center justify-content-center border border-primary mt-3 p-5 rounded border-2'>
                    <h6 className='py-5'>{fileName ? `${fileName} Selected` : "Drag and Drop CSV File Here"}</h6>
                </div>
                <button onClick={Upload} className='btn rounded-1 btn-primary mt-3 col-12 col-md-5'>Upload</button>
            </div>
            <div className='w-100'>
                {
                    records.length
                        ? <div className='ps-md-2 mt-5'>
                            <h5>Records</h5>
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <th scope='col' >Name</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>Phone</th>
                                        <th scope='col'>Address</th>
                                    </tr>
                                    {
                                        records.map((record, index) => (
                                            <tr key={index}>
                                                <td scope='row' >{record.name}</td>
                                                <td>{record.email}</td>
                                                <td>{record.phone}</td>
                                                <td>{record.address}</td>
                                            </tr>
                                        ))
                                    }</tbody>
                            </table>
                        </div> : null
                }
            </div>
            <Loader loading={loading} />

        </div>
    )
}

export default Upload