import React, { useEffect, useState } from 'react';
import axios from 'axios'
import ListProduct from '../ListProduct'
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';


function CategorHotProduct(props) {
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [ListCategory, setListCategory] = useState([])
    useEffect(() => {
        async function FetchApi(){
            try {
                const {data} = await axios.get('http://localhost:8080/api/user/category');
                console.log('data',data);
                setListCategory(data)
            } catch (error) {
            }
        }
        FetchApi()
    }, [])

   

    return (
        <section id="hotsale">  
        {
            ListCategory.map(category => (
                <div className="hotsale">
                <h2><Link to={`/product`} style={{color:'inherit'}}>{category.categoryName}</Link></h2>
                {
                   <ListProduct CategoryId={category.id}></ListProduct>
                }
            </div>
            ))
        }
           
        </section>

    );
}


export default CategorHotProduct;