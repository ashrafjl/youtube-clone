import React, { useEffect, useState } from "react";
import HomeScreen from "./components/screen/HomeScreen";
import SingleScreen from "./components/screen/SingleScreen";
import { Container } from "react-bootstrap";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import {
  useNavigate,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import "./App.css";
import LoginScreen from "./components/screen/LoginScreen";
import { useSelector } from "react-redux";
import SearchScreen from "./components/screen/SearchScreen";
const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);
  const handleToggleSidebar = () => {
    toggleSidebar((value) => !value);
  };
  return (
     <>
        <Header handleToggleSidebar={handleToggleSidebar} />
        <div className='app_container'>
           <Sidebar
              sidebar={sidebar}
              handleToggleSidebar={handleToggleSidebar}
           />
           <Container fluid className='app_main '>
              {children}
           </Container>
        </div>
     </>
  )
}
function App() {
  const {accessToken,loading} = useSelector(state=>state.auth);
  const navigate = useNavigate()

  useEffect(()=>{
    if(!loading && !accessToken){
        navigate('/auth')
    }
  },[accessToken,loading,navigate])
  return (
      <Routes>
       <Route path='/' exact element={<Layout> <HomeScreen /></Layout>} />
       <Route path='/auth' element={<LoginScreen />} />
       <Route path='/search/:query' exact element={<Layout><SearchScreen /></Layout>} />
       <Route path='/watch/:id' exact element={<Layout><SingleScreen /></Layout>} />
       <Route path='*' exact={true} element={<Navigate to="/" />} />
    </Routes>

 )
}

export default App;
