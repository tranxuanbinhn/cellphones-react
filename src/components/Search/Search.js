import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {searchProduct} from '../../actions/ProductAction';

import {handlePercentDiscount} from '../../untils/index'
import './Search.css'
import ListProduct from './ListProduct'
function Search(props) {
    
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [prevSearchTerm, setPrevSearchTerm] = useState('');
  
    const productSearch = useSelector(state => state.searchProduct.products);
     
    const [page, setPage] = useState(1);
    const goToNextPage = () => {
        setPage(page + 1);
    };
   
        

    
    const [listProduct, setListProduct] = useState([]);
     
    useEffect(()=>{
        
        if (searchTerm !== productSearch?.name) {
            // Nếu có, đặt listProduct là một mảng trống
            setListProduct([]);
            setPage(1);
            // Lưu giá trị searchTerm mới vào prevSearchTerm
            setSearchTerm(productSearch?.name);
            // Reset page về 1 khi có sự thay đổi trong tìm kiếm
           
        }
         
         

        if (Array.isArray(productSearch?.listResult)) {
          
            setListProduct(prevProducts => [...prevProducts, ...productSearch.listResult]);
        }
    }, [productSearch])
    useEffect(() => {
       
        // Cập nhật listProduct khi searchProduct.listResult thay đổi
        dispatch(searchProduct(productSearch?.name, page));
    }, [page]);
     
    return (
        <section id="hotsale iphone">
            <div className="hotsale">
                {listProduct  && listProduct .length > 0 ? (
                    <ListProduct products={listProduct } />
                ) : (
                    <h2>Không tìm thấy sản phẩm</h2>
                )}
            </div>
            <div className='btn-showmore'>
                <a className='btn-showmore-inner' onClick={goToNextPage}>
                    Show more {productSearch?.remainingproduct} product
                </a>
            </div>
        </section>
    );
}

export default Search;