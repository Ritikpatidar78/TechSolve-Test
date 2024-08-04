import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Screens/Home'
import Upload from './Screens/Upload'
import EditRecord from './Screens/EditRecord'
import { Navbar } from './Components/Navbar'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/editRecord/:id' element={<EditRecord />} />
      </Routes>
    </BrowserRouter>
  )
}