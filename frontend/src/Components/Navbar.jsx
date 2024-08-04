import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-secondary">
            <Link className="navbar-brand text-light ps-3" to={"/"} >TechSolvo</Link>
        </nav>
    )
}
