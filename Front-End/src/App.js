import React, { useEffect, useState } from "react";
import PracticeTests from './Pages/PracticeTests/Practicetests';
import Home from './Pages/Home/Home';
import PMP_Certificate from './Pages/PMPCertification/PMPcertificate';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./Dashboard/AdminDashboard/AdminDashboard";
import UserDashboard from "./Dashboard/UserDashboard/UserDashboard";
import ExamEnv from "./Dashboard/UserDashboard/ExamEnv/ExamEnv";
import Registration from './Pages/Registration/Registration';
import LogIn from './Pages/Registration/LogIn';
import { loadUser } from "./Redux/Actions/UserAuthActions"
import Cart from "./Pages/Cart/Cart"
import CheckOut from "./Pages/Cart/CheckOut"
import PuffLoader from "react-spinners/PuffLoader"
import Profile from './Pages/Registration/Profile';
import styled from 'styled-components';
import Unauthorized from "./Images/401Unauthorized.svg";
import NotFound from './NotFound';
import SelectedTest from './Pages/PracticeTests/SelectedTest';
import { useDispatch, useSelector } from "react-redux";
import { loadCart } from "./Redux/Actions/CartActions";
import GetStarted from "./Pages/GetStarted/GetStarted";

function App(props) {
  const dispatch = useDispatch();
  const [spinnerOn, setSpinnerOn] = useState(false);
  const auth= useSelector(state=>state.auth)
  useEffect(() => {
    dispatch(loadUser())
    dispatch(loadCart())
  }, [])
  const CheckLogInAuthorization = (component) => {
    if (auth.loggedIn) return (component)
    else return (<Image><object data={Unauthorized} type="image/svg+xml" /></Image>)
  }
  return (
    <div>
      {spinnerOn ? <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <PuffLoader css={"display: block; margin: 0 0 0 0;"} size={150} />
      </div> :
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/practicetests" element={<PracticeTests />} />
          <Route path="/practicetests/*" element={<SelectedTest />} />
          <Route path='/pmpcertificate' element={<PMP_Certificate />} />
          <Route exact path='/dashboard/*' element={CheckLogInAuthorization(<AdminDashboard />)} />
          <Route exact path='/mydashboard/*' element={CheckLogInAuthorization(<UserDashboard />)} />
          <Route exact path='/examenv/:id' element={<ExamEnv />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/cart/checkout' element={<CheckOut />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/getstarted' element={<GetStarted />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      }
    </div>
  )
}
export default App;
const Image = styled.div`
display: flex; 
align-items: center;
justify-content: center;
border: solid;
height: 100vh;
width: 100vw;
&>object{
  width: 50%;
}
`