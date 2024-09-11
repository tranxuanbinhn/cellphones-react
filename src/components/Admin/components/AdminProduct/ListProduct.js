import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCurrentPage, paginationProduct } from '../../../../actions/ProductAction';
import Product from './Product';
import { Pagination } from 'antd';

function ListProduct(props) {
    const dispatch = useDispatch()

    const {listProducts} = props;
    const listResult = listProducts?.listResult;
    const currentPage = useSelector(state => state.allProduct.currentPage)
    const {pages} = useSelector(state => state.allProduct.product)
     
    const HandleChangePage = async (number) => {
         
        await dispatch(paginationProduct(number))
        dispatch(editCurrentPage(number))
    }

    return (
       <div className="admin-product-list">
           <table>
                <tr>
                    <th></th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Type</th>
                </tr>
                {
                    listResult ? listResult.map((item, index) => (<Product product={item} key={item.id} update={item.id} number={index}></Product>)) : ''
                }
            </table>
            
            <div className="pagination">
                <Pagination defaultCurrent={1} current={currentPage} total={listProducts?.totalItems} pageSize={2} onChange={HandleChangePage}/>
            </div>

       </div>
    );
}

export default ListProduct;