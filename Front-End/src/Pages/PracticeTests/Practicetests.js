import React from 'react';
import Header from './Header';
import ProductContainer from './ProductContainer';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../Components/AppNavbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { useDispatch } from 'react-redux';
import { fetchPracticeTestsSuccess } from '../../Redux/Actions/practiceTestsActions';
import { Helmet } from 'react-helmet';

function PracticeTests() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPracticeTestsSuccess());
    }, [])
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