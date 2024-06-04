import React, { useEffect, useState } from 'react';
import Product from './Product'
import axios from 'axios'
function ListProduct(props) {
    const [ListProduct, setListProduct] = useState([]);
    useEffect(() => {
        const Category = props.CategoryId;
        async function FetchApi(){
            try {
                const {data} = await axios.get(`http://localhost:8080/api/user/product?categoryId=${Category}`);
                console.log('data',data);
                setListProduct(data)
            } catch (error) {
            }
        }
        FetchApi()
    }, [])
    

    return (
        <div className="hotsale-listproduct">
            {
                ListProduct.map((product, index) => (
                    <Product product={product} key={index}></Product>
                ))
            }
        </div>
    );
}

export default ListProduct;