import React from 'react';
import Signup from '../components/Signup/Signup'
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
function SignupPage(props) {
    return (
        <div>
            <Header></Header>
            <Signup></Signup>
            <Footer></Footer>

        </div>
    );
}

export default SignupPage;