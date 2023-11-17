import React from 'react'
import '../pages/custom.css'
import { Link } from 'react-router-dom'
function Header() {
    return (    
        <div className="bredcrumb-container">
            <div className="bredcrumb">
                <ul className="breadcrumb">
                    <li><a href="/">Dashboard</a></li>
                    <li><a href="/AddRole">Roles</a></li>
                    <li><Link>Edit Role</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header
