import PracticeTests from './Pages/PracticeTests/Practicetests';
import Home from './Pages/Home/Home';
import PMP_Certificate from './Pages/PMPCertification/PMPcertificate';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./Dashboard/AdminDashboard/AdminDashboard";
import UserDashboard from "./Dashboard/UserDashboard/UserDashboard";
import ExamEnv from "./Dashboard/UserDashboard/ExamEnv/ExamEnv";
import { connect } from "react-redux";
import Registration from './Pages/Registration/Registration';
import LogIn from './Pages/Registration/LogIn';
import { loadUser } from "./Redux/Actions/UserAuthActions"
import Cart from "./Pages/Cart/Cart"
import CheckOut from "./Pages/Cart/CheckOut"
import { loadCart } from './Redux/Actions/CartActions';
import PuffLoader from "react-spinners/PuffLoader"
import Profile from './Pages/Registration/Profile';


const mapStateToProps = (state) => {
  const { allPracticeTests } = state;
  const { allExams } = state;
  const practiceTests = allPracticeTests.practiceTests
  const Exams = allExams.exams
  const auth = state.auth
  const cart = state.cart
  return {
    practiceTests, Exams, auth, cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //fetchPracticeTestsSuccess: () => dispatch(fetchPracticeTestsSuccess()),
    //fetchExamsSuccess: () => dispatch(fetchExamsSuccess()),
    loadUser: () => dispatch(loadUser()),
    loadCart: (id) => dispatch(loadCart(id))
  }
}

class App extends Component {
  state = {
    loggedIn: false,
    spinnerOn: true,
  }
  componentDidMount() {
    //this.props.fetchPracticeTestsSuccess();
    //this.props.fetchExamsSuccess();
    this.props.loadUser();
  }
  static getDerivedStateFromProps(props, state) {
    if (props.auth.loggedIn && props.auth.loggedIn !== state.loggedIn) {
      //console.log("userlogged:", props.auth)
      props.loadCart(props.auth.userData._id);
      return {
        loggedIn: props.auth.loggedIn
      }
    }
    else {
      return {
        loggedIn: state.loggedIn
      }
    }
  }
  render() {
    if(this.state.spinnerOn) {
       setTimeout(() => {
         this.setState({ spinnerOn: false })
       }, 1000);
    }
    //const location= this.props.location
    //console.log(location.pathname.match('/dashboard/*') )
    // if(location.pathname.match==='/dashboard/*' || location.pathname.match==='/mydashboard/*' ||
    // location.pathname.match==='/examenv/:id' ){
    //   console.log("dashboards")
    // }
    //console.log(this.props.cart)
    return (
      <div>
        {this.state.spinnerOn ? <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <PuffLoader css={"display: block; margin: 0 0 0 0;"} size={150} />
        </div> :
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/practicetests" element={<PracticeTests />} />
            <Route path='/pmpcertificate' element={<PMP_Certificate />} />
            <Route exact path='/dashboard/*' element={<AdminDashboard />} />
            <Route exact path='/mydashboard/*' element={<UserDashboard />} />
            <Route exact path='/examenv/:id' element={<ExamEnv />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/cart/checkout' element={<CheckOut/>} />
            <Route exact path='/profile' element={<Profile />} />
          </Routes>
        }
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);