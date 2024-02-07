import React from 'react'
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
const NavBar = () => {
  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
            <a href='#' className='flex justify-center items-center gap-2'>
                <img
                    src={Logo}
                    alt="Solar System"
                    className="w-[65px] h-[65px]"
                />
                <p className="orange_gradient text-xl font-bold">SolSphere</p>
            </a>
    </nav>
  )
}

export default NavBar