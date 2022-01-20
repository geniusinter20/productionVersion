
import { Component } from 'react';
import Segment from './IMG_Segment';
import Aboutpmp from "./AboutPMP";
import HowItWorks from './How_it_works';
import NavBar from '../../Components/AppNavbar/Navbar';
import Footer from '../../Components/Footer/Footer';

class PMP_Certificate extends Component {
    render() {
        return (
            <div>
                <NavBar></NavBar>
                <Segment></Segment>
                <HowItWorks></HowItWorks>
                <Aboutpmp></Aboutpmp>
                <Footer></Footer>
            </div>
        )
    }
}
export default PMP_Certificate;