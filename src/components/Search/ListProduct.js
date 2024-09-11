import React from 'react';
import Product from './Product'

function ListProduct(props) {
    const listResult  = props.products;
     

    return (
        <div className="hotsale-listproduct">
            {
                listResult .map((product, index) => (
                    <Product product={product} key={index}></Product>
                ))
            }
        </div>
    );
}

export default ListProduct;