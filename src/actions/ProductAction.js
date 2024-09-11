import axios from "axios";
import actions from './product.action'
import {BASE_URL} from '../constants/UserConstant'
import { axiosClient } from "../services/config.services";

export const filterProductByType = (name) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/products/${name}`);
    dispatch({ type: "FILTER_PRODUCT_BY_TYPE", payload: data });
  } catch (error) {
  }
};


export const filterProductByRandomField = (infoProduct) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/products/filter/random`, infoProduct);
    dispatch({ type: "FILTER_PRODUCT_BY_RANDOM_FIELD", payload: data });
  } catch (error) {
  }

  // dispatch({ type: "FILTER_PRODUCT_BY_RANDOM_FIELD", payload: infoProduct });
};

export const getAllProductByCategoryCode = (page, dir) => async (dispatch) => {
  try {
    let url = undefined;
    if(dir==undefined)
      {
        url  = `${process.env.REACT_APP_API_ENDPOINT}/api/user/product/getall?&page=${page}&limit=5`;
      }
      else{
        if(dir === 'asc')
          {
        url = `${process.env.REACT_APP_API_ENDPOINT}/api/user/product/fillterall?page=${page}&limit=5&orderby=price&dir=0`;

          }
          else if(dir === 'desc')
            {
              
        url = `${process.env.REACT_APP_API_ENDPOINT}/api/user/product/fillterall?page=${page}&limit=5&orderby=price&dir=1`;

            }
      }
     
    const { data } = await axios.get(url);
     
     
    
    dispatch({ type: "GET_ALL_PRODUCT", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ALL_PRODUCT_FAIL", payload: error.message });
  }
};

export const deleteAllProductInStore = () => async (dispatch) => {
  try {
  
    dispatch({ type: "DELETE_ALL_PRODUCT"});
  } catch (error) {
    dispatch({ type: "GET_ALL_PRODUCT_FAIL", payload: error.message });
  }
};


export const ascendingProduct = (page) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/user/product/fillterproduct?categorycode=lap-top&page=1&limit=2&orderby=price&dir=0`);
     
     
    const asc = {
      name:'asc',
      ...data
    }
    dispatch({ type: "GET_ALL_PRODUCT", payload: asc });
  } catch (error) {
    dispatch({ type: "GET_ALL_PRODUCT_FAIL", payload: error.message });
  }
};

export const descendingProduct = (page) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/user/product/getallproductbycategory?categorycode=lap-top&page=${page}&limit=2&orderby=price&dir=1`);
     
     
    const desceending = {
      name:'desc',
      ...data
    }
    dispatch({ type: "GET_ALL_PRODUCT", payload: desceending });
  } catch (error) {
    dispatch({ type: "GET_ALL_PRODUCT_FAIL", payload: error.message });
  }
};

export const filterProduct = (name) => async (dispatch, getState) => {
  dispatch({ type: "FILTER_PRODUCT", payload: name });
};

export const filterProductByPrice =
  (startPrice, endPrice, page) => async (dispatch, getState) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/user/product/filterbyprice?minprice=${startPrice}&maxprice=${endPrice}&page=${page}&limit=2`
    );

    dispatch({
      type: actions.FILTER_PRODUCT_BY_PRICE,
      payload: data,
    });
  };

export const editCurrentPage = (page) => async (dispatch) => {
  dispatch({ type: "EDIT_CURRENT_PAGE", payload: page });
}

export const paginationProduct = (page) => async (dispatch) => {
  try {
    const token = localStorage.getItem('accessToken');
    const request = {
      url:`${process.env.REACT_APP_API_ENDPOINT}/api/admin/product?page=${page}&limit=2`,
      headers:{
        Authorization: ` Bearer ${token}`
      },
      method:'get'
      
    }
    const {data} = await axios(request);
     
    dispatch({ type: "PAGINATION_PRODUCT", payload: data });
  } catch (error) {
  }
};
export const deleteReview = (id) => async (dispatch) => {
  try{
    const token = localStorage.getItem('accessToken');
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/api/admin/review/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
  catch(error)
  {
     
  }
}
export const getallreviewProduct = (id) => async (dispatch) => {
  try {
   
     
    const token = localStorage.getItem('accessToken');
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/admin/review?page=1&limit=2&id=${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );
     
    dispatch({ type: "GET_ALL_REVIEW_PRODUCT", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ALL_REVIEW_PRODUCT_FAIL", payload: error.message });
  }
}
export const getproductById = (id) => async (dispatch) => {
  try {
   
     
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/user/product/detail/${id}`
    );
    dispatch({ type: "GET_PRODUCT_BY_ID", payload: data });
  } catch (error) {
    dispatch({ type: "GET_PRODUCT_BY_ID_FAIL", payload: error.message });
  }
};

export const removeProductById = (id) => async (dispatch) => {
  dispatch({ type: "REMOVE_PRODUCT_BY_ID"});
};

export const saveProduct = (product) => async (dispatch, getState) => {
  
  try {
    

    
    const token = localStorage.getItem('accessToken');
    const {
      userSignin: { userInfo },
    } = getState();
    if (product.get("id")===null||product.get("id")===undefined ) {
     
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/admin/product`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`
          
          },
        }
      );
      dispatch({ type: "SAVE_PRODUCT", payload: data });
      // document.location.href = '/admin/product';
    } else {
       
       
      const id = product.get("id");
      product.delete('id');
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/api/admin/product/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`
          
          },
        }
      );
       
      dispatch({ type: "SAVE_PRODUCT", payload: data });
      // document.location.href = '/admin/product';
    }
  } catch (error) {
     
    dispatch({ type: "SAVE_PRODUCT_FAIL", payload: error.message });
  }
};

export const DeleteProduct = (productId) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('accessToken');
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/api/admin/product/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "DELETE_PRODUCT", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_PRODUCT_FAIL", payload: error.message });
  }
};

export const clearSearchProduct = () => (dispatch) => {
  dispatch({ type: "CLEAR_SEARCH_PRODUCT" });
};
export const searchProduct = (name, page) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/user/product/search?name=${name}&page=${page}&limit=2`
    );
    const searchData ={
      name: name,
      ...data
    }
     

    dispatch({ type: "SEARCH_PRODUCT", payload: searchData });
  } catch (error) {
    dispatch({ type: "SEARCH_PRODUCT_FAIL", payload: error.message });
  }
};

export const reviewProduct = (review) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('accessToken');
    const request = {
      method:'post',
      url:`${process.env.REACT_APP_API_ENDPOINT}/api/user/review/add`,
      headers:{
        Authorization:`Bearer ${token}`
      }, 
      data:review
    }
     

    const { data } = await axios(request);
     
    
  } catch (error) {
    dispatch({ type: "REVIEW_PRODUCT_FAIL", payload: error });
  }
};

export const getReviewProduct = (id, page) => async (dispatch, getState) => {
  try {    
     
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/user/review?page=${page}&limit=2&id=${id}`);
    dispatch({ type: "REVIEW_PRODUCT", payload: data });
  } catch (error) {
    dispatch({ type: "REVIEW_PRODUCT_FAIL", payload: error });
  }
};
export const getRateProduct = (id) => async (dispatch) => {
  try{
     const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/user/review/getrate?id=${id}`);
      
    dispatch({ type: "GET_RATE", payload: data });
  }
  catch(error)
  {
    
  }
}


export const commentProduct = (id, comment) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(
      `http://localhost:4000/products/comment/${id}`,
      comment
    );
    dispatch({ type: "COMMENT_PRODUCT", payload: data });
  } catch (error) {
    dispatch({ type: "COMMENT_PRODUCT_FAIL", payload: error });
  }
};

export const repCommentProduct = (id, comment) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/products/rep/comment/${id}`,
        comment
      );
      dispatch({ type: "REP_COMMENT_PRODUCT", payload: data });
    } catch (error) {
      dispatch({ type: "REP_COMMENT_PRODUCT_FAIL", payload: error });
    }
  };

  export const pinCommentProduct = (id, comment) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/products/pin/comment/${id}`, comment
      );
      dispatch({ type: "PIN_COMMENT_PRODUCT", payload: data });
    } catch (error) {
      dispatch({ type: "PIN_COMMENT_PRODUCT_FAIL", payload: error });
    }
  };

export const BlogProduct = (id, blog, callback) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      `http://localhost:4000/products/blog/${id}`,
      blog,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: "BLOG_PRODUCT", payload: data });
    callback();
  } catch (error) {
    dispatch({ type: "BLOG_PRODUCT_FAIL", payload: error });
  }
};
