import React from 'react';
import {formatPrice} from '../../untils/index';
import { useDispatch } from 'react-redux';

import {AddToCart,AddToCart2, DeleteToCart, DeleteQtyProduct} from '../../actions/CartAction'



function Product(props) {
    const dispatch = useDispatch();
    const { product } = props;

    function AddToCart1(product) {
        const action = AddToCart(product,true);
         dispatch(action);
    }

    return (
        <div className="hotsale-listproduct-product">
            <a href={"/detail/" + product.id}>
                <img src={product.image}></img>
                <p className="hotsale-listproduct-product-name">{product.productName}</p>
                <div className="price">
                   
                    <span className="price">{formatPrice(product.price)} đ</span>
                </div>
            </a>
          
            <div className="buy">
                <a href="/cart" onClick={() => AddToCart1(product)}> Mua Ngay</a>
            </div>
        </div>
    );
}

export default Product;