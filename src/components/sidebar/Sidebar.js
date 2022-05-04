import React from 'react'
import './Sidebar.css'
import {MdSubscriptions, MdExitToApp, MdThumbUp, MdHistory, MdLibraryBooks, MdHome, MdSentimentDissatisfied} from 'react-icons/md'
import { useDispatch } from 'react-redux/es/exports'
import { logout } from '../../redux/actions/auth.action'
import { Link } from "react-router-dom";
const Sidebar = ({sidebar, handleToggleSidebar}) => {
  const dispatch = useDispatch()
  const logoutHandler = ()=>{
      dispatch(logout())
  }
  return (
   <nav className={sidebar ? 'sidebar open' : 'sidebar'} onClick={()=>handleToggleSidebar(false)}>
    <Link to={'/'}> <li><MdHome size={23}/><span>Home</span></li></Link>
    <li><MdHome size={23}/><span>Home</span></li>
     <hr />
     <li onClick={logoutHandler}><MdExitToApp size={23}/><span>Logout</span></li>
     <hr />
   </nav>
  )
}

export default Sidebar