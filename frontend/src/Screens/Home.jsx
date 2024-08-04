import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Components/Loader'

const PAGE_SIZE = 20

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const navigate = useNavigate()

    const LoadData = async () => {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/techsolvo/api`, {
            params: { page }
        })
        setData(response.data)
        setLoading(false)
    }

    const Download = async () => {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/techsolvo/api/download`)
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Create an anchor element
        const a = document.createElement('a');
        a.href = url;
        a.download = 'download.csv'; // Set the filename for the download

        // Append the anchor to the document
        document.body.appendChild(a);

        // Programmatically click the anchor to trigger the download
        a.click();

        // Clean up by revoking the Blob URL and removing the anchor
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setLoading(false)

    }

    useEffect(() => {
        LoadData()
    }, [page])


    return (
        <div className='w-100 p-2 p-md-4'>
            <div className='d-flex w-100 align-items-start justify-content-between'>
                <h5>My Records</h5>
                <div className='d-flex gap-2'>
                    <button onClick={() => {
                        Download()
                    }} className='btn btn-success btn-sm btn-md-md rounded-1'>
                        Download CSV
                    </button>
                    <button onClick={() => {
                        navigate("/upload")
                    }} className='btn btn-primary btn-sm btn-md-md rounded-1'>
                        Upload Data
                    </button>
                </div>
            </div>
            <div className='d-flex gap-2 align-items-center justify-content-end mt-5'>
                <button disabled={page === 1} onClick={() => {
                    setPage(page - 1);
                }} className="btn btn-light">⬅</button>
                <span>{page}</span>
                <button disabled={loading || data.length < PAGE_SIZE} onClick={() => {
                    setPage(page + 1);
                }} className="btn btn-light">➡</button>
            </div>
            {
                !loading && !data.length
                    ? <h6 className='mt-5 text-center'>Not Records Found</h6>
                    : <div className='w-100'>
                        {
                            <div className='ps-md-2 mt-5 w-100 overflow-hidden'>
                                <table className='table w-100'>
                                    <tbody className='w-100'>
                                        <tr className='w-100'>
                                            <th className='w-25'>Name</th>
                                            <th className='w-25'>Email</th>
                                            <th className='w-25'>Phone</th>
                                            <th className='w-25'>Address</th>
                                        </tr>
                                        {
                                            data.map((record, index) => (
                                                <tr onClick={() => {
                                                    navigate(`editRecord/${record._id}`)
                                                }} className='w-100' key={index}>
                                                    <td className='w-25'>{record.name}</td>
                                                    <td className='w-25'>{record.email}</td>
                                                    <td className='w-25'>{record.phone}</td>
                                                    <td className='w-25'>{record.address}</td>
                                                </tr>
                                            ))
                                        }</tbody>
                                </table>
                            </div>
                        }
                    </div>
            }
            <Loader loading={loading} />
        </div>
    )
}

export default Home