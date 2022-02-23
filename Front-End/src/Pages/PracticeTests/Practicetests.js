import React from 'react';
import Header from './Header';
import ProductContainer from './ProductContainer';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../Components/AppNavbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPracticeTestsSuccess, fetchPurchasedPracticeTests } from '../../Redux/Actions/practiceTestsActions';
import { Helmet } from 'react-helmet';

function PracticeTests() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    useEffect(() => {
        dispatch(fetchPracticeTestsSuccess());
    }, [])
    useEffect(() => {
      if(auth.loggedIn)dispatch(fetchPurchasedPracticeTests(auth.userData._id))
    }, [auth.loggedIn])
    
    return (
        <div>
            <Helmet>
                <title>Practice Tests</title>
                <meta name="description" content="Genius practice Tests" />
            </Helmet>
            <NavBar></NavBar>
            <Header></Header>
            <ProductContainer></ProductContainer>
            <Footer></Footer>
        </div>
    )
}
export default PracticeTests;