import React, { useState } from 'react'
import './Header.css'
import { useSelector } from "react-redux";
import {FaBars} from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdNotifications, MdApps } from 'react-icons/md'
import Logo from '../../images/youtubelogo.png'
import { useNavigate } from 'react-router';
const Header = ({handleToggleSidebar}) => {
  const [input,setInput] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e)=>{
    e.preventDefault()
    navigate(`/search/${input}`)
    setInput('')
  }
  return (
    <div className='header'>
        <FaBars className='header_menu' size={26} onClick={()=>handleToggleSidebar()}/>
        <img src={Logo} alt="" className="header_logo" />
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Search'value={input} onChange={(e)=> setInput(e.target.value)}/>
          <button type='submit'>
            <AiOutlineSearch size={22}/>
          </button>
          </form>
          <div className="header_icons">
            <MdNotifications size={28}/>
            <MdApps size={28}/>
             <img src='https://www.w3schools.com/howto/img_avatar.png' />
          </div>
    </div>
  )
}

export default Header