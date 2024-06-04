import React, {useEffect} from 'react';
import { formatPrice } from '../../untils';
import './ShoppingCart.css'
import ListProduct from './ListProduct';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
    Link,
    useHistory
} from "react-router-dom";
import { GetAllProductInCart } from '../../actions/CartAction';

function Cart(props) {
  const dispatch = useDispatch();
  
    const cartItems = useSelector((state) => state.cart.cartItems);
    console.log('cart items', cartItems);
    
 

   
   useEffect(()=>
  {
    console.log('Do')
    dispatch(GetAllProductInCart());
  },[])
    
    return (
      <section id="shopping-cart">
        <div className="shopping-cart">
          <div className="shopping-cart-header">
            <Link to="/" className="back">
              {/* <BsChevronDoubleLeft></BsChevronDoubleLeft> */}
              Tiếp tục mua hàng
            </Link>
            <h2 className="shopping-cart-title">Giỏ hàng</h2>
          </div>

          {cartItems ? <ListProduct products={cartItems}></ListProduct> : ""}

          
        </div>
      </section>
    );


}

export default Cart;
