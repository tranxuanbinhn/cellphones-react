import React, { useEffect, useState } from 'react';
import ListProduct from './ListProduct'
import './page.css';
import './Sale.css'
import {handlePercentDiscount} from '../../untils/index'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct, getAllProductByCategoryCode, deleteAllProductInStore} from '../../actions/ProductAction';

import SortByPrice from './SortByPrice/SortByPrice';


function AllProduct(props) {
    const dispatch = useDispatch()
    
    const product = useSelector(state => state.allProduct.product);
     
    //const productObject = useSelector(state => state.allProduct);
    // 
    const [page, setPage] = useState(1);
    const [filter,setFilter] = useState(false);
    const goToPrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const goToNextPage = () => {
        setPage(page + 1);}

    const [totalpage, setTotalPage] = useState(0);
     
    const [listProduct, setListProduct] = useState([]);
    const pageElements = [];
     
    useEffect(() => {
         
            const urlParams = new URLSearchParams(window.location.search);
            if(urlParams.has('sort'))
                {
                    const dir = urlParams.get('sort');
                    dispatch(getAllProductByCategoryCode(page,dir));
                }
                else
                {
                    dispatch(getAllProductByCategoryCode(page));
                    
                }
            
                

         
         
    }, [page]); // useEffect này chỉ gọi một lần khi component được render lần đầu tiên
  
    useEffect(() => {
        // Cập nhật totalpage khi product.totalPage thay đổi
        setTotalPage(product.totalPage);
        // Cập nhật listProduct khi product.listResult thay đổi
         
         

if (Array.isArray(product.listResult)) {
        setListProduct(prevProducts => [...prevProducts, ...product.listResult]);
    }  
        //product.listResult
    }, [product.listResult]); // useEffect này được gọi lại mỗi khi product thay đổi

    useEffect(()=>{
         
        return  setListProduct([]);
    },[])
    return (
        <section id="hotsale iphone">
            <div className="hotsale">
               
                <SortByPrice page={page}></SortByPrice>
                {
                   listProduct && listProduct.length > 0 ? (<ListProduct HotSaleProducts={listProduct}></ListProduct>) : (<span>Không có sản phẩm</span>)
                }
            </div>
          <div className='btn-showmore'>
            <a className='btn-showmore-inner' onClick={goToNextPage}>Show more {product.remainingproduct} product</a>
          </div>
        </section>

    );
}


export default AllProduct;