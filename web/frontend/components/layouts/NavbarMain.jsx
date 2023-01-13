import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Pagecss from '../../css/Main_nav.module.css'
import Content from '../BundleDiscount/Content'
const NavbarMain = ({ nav }) => {
    return (
        <>
            <div className={`countdown_box ${Pagecss.box}`}>
                <ul className="countdown" id="navBar">
                    {nav.map((x) => {
                        // let idtype = id == null ? x.path : `${x.path}?id=${id}`
                        return (
                            <li key={x.path} id={x.title} className="countdown_tab">
                                {/* <NavLink to={x.path} className={({ isActive }) => (isActive ? 'active' : 'inactive')} end> */}
                                {x.title}
                                {/* </NavLink> */}
                            </li>
                        )
                    })}
                </ul>
                <Outlet />
            </div>
            <Content />
        </>
    )
}

export default NavbarMain