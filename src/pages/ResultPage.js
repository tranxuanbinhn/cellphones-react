import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header/Header';
import ResultOrder from '../components/resultorder/ResultOrder';



function ResultPage(props) {
    return (
        <div>
            <Header></Header>
            <ResultOrder></ResultOrder>
        </div>
    );
}

export default ResultPage;