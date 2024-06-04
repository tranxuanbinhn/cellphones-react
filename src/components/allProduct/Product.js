import React from 'react';
import {formatPrice} from '../../untils/index'


function Product(props) {
    const { product } = props;

    function AddToCart(product) {
        // const action = AddProduct(product);
        // dispatch(action);
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
                <a href="/cart" onClick={() => AddToCart(product)}> Mua Ngay</a>
            </div>
        </div>
    );
}

export default Product;