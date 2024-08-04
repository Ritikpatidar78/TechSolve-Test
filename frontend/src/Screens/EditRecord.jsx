import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import Loader from '../Components/Loader'

const EditRecord = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const LoadData = async () => {
        setLoading(true)
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/techsolvo/api/singleRecord`, { params: { id } })
        setName(data.record.name || "")
        setEmail(data.record.email || "")
        setPhone(data.record.phone || "")
        setAddress(data.record.address || "")
        setLoading(false)
    }
    useEffect(() => {
        LoadData()
    }, [])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const Submit = async () => {
        setLoading(true)
        if (!name || !email || !phone || !address) return alert("Enter All Fields")
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/techsolvo/api/${id}`, {
            name, email, phone, address
        })

        if (response.status === 200) {
            setLoading(false)
            navigate("/")
        }
        else {
            alert("Something went Wrong")
        }
    }

    const Delete = async () => {
        setLoading(true)
        const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/techsolvo/api/${id}`)
        if (response.status === 200) {
            setLoading(false)
            navigate("/")
        }
        else {
            alert("Something went Wrong")
        }
    }
    return (
        <div className='w-100 p-2 p-md-4'>
            <h5>Edit Record</h5>
            <div className='col-12 col-md-6 col-lg-4 mx-auto'>
                <div className="form-group mt-4">
                    <label>Name</label>
                    <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" className="form-control" placeholder="Name" />
                </div>
                <div className="form-group mt-4">
                    <label>Email</label>
                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="form-group mt-4">
                    <label>Phone</label>
                    <input value={phone} onChange={(e) => { setPhone(e.target.value) }} type="text" className="form-control" placeholder="Phone" />
                </div>
                <div className="form-group mt-4">
                    <label>Address</label>
                    <input value={address} onChange={(e) => { setAddress(e.target.value) }} type="text" className="form-control" placeholder="Address" />
                </div>
                <button onClick={Submit} className='btn btn-primary mt-4 w-100 rounded-1'>Update</button>
                <button onClick={Delete} className='btn btn-danger mt-4 w-100 rounded-1'>Delete</button>
            </div>
            <Loader loading={loading} />
        </div>
    )
}

export default EditRecord