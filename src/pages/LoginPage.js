import React from 'react';
import Login from '../components/login/Login';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';


function LoginPage(props) {
    return (
        <div>
            <Header></Header>
            <Login></Login>
            <Footer></Footer>
        </div>
    );
}

export default LoginPage;