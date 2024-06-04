import React from 'react';
import Product from './Product'

function ListProduct(props) {
    const listResult  = props.products;
    console.log('HotSaleProducts',listResult );

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