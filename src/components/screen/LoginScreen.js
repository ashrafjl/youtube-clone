import React, { useEffect } from 'react'
import './LoginScreen.css'
import Logo from '../../images/youtubelogo.png'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/auth.action'
import { useNavigate } from 'react-router-dom';
const LoginScreen = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.auth.accessToken)
  const handleLogin = ()=>{
      dispatch(login())
  }
  const navigate = useNavigate()
  useEffect(()=>{
    if(accessToken){
      navigate('/')
    }
  },[accessToken,navigate])
  return (
    <div className='login'>
        <div className='login_container'>
            <img src={Logo} alt=''/>
            <button onClick={handleLogin}>Login with Google</button>
            <p>Made By <a href='https://twitter.com/ashraflucky99' target={'_blank'}>Ashraf Jamal</a> Using Youtube Data API</p>
        </div>
    </div>
  )
}

export default LoginScreen