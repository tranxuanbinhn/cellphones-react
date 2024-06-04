import React from 'react';
import Cart from '../components/ShoppingCart/Cart'
import Header from '../components/header/Header';

function CartPage(props) {
    return (
        <div>
            <Header></Header>
            <Cart></Cart>
        </div>
    );
}

export default CartPage;