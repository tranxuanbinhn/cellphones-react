import axios from "axios";
export const AddToCart = (product,check) => async (dispatch) => {
    
    console.log('check', product);
    const url = `http://localhost:8080/api/user/cart/add`;
    const cart = {
        productId:product.id,
        quantityProduct:1,
        add:check
    }
    const token = localStorage.getItem('accessToken');
    console.log('token is',token);
    const config = {
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        }
    }
    const respone = axios.post(url, cart,config);
    console.log('product in cart', cart);
    //dispatch({type: 'ADD_TO_CART', payload: product})
    console.log('respones', respone);

}
export const AddToCart2 = (product,check) => async (dispatch) => {
    
    console.log('check', product);
    const url = `http://localhost:8080/api/user/cart/add`;
    const cart = {
        productId:product.productId,
        quantityProduct:1,
        add:check
    }
    const token = localStorage.getItem('accessToken');
    console.log('token is',token);
    const config = {
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        }
    }
    const respone = axios.post(url, cart,config);
    console.log('product in cart', cart);
    //dispatch({type: 'ADD_TO_CART', payload: product})
    console.log('respones', respone);

}
export const GetAllProductInCart = () =>async (dispatch)=>{
    const token = localStorage.getItem('accessToken');
const config = {
    headers:{
        Authorization:`Bearer ${token}`,
        'Content-Type':'application/json'
    }
}
const data = axios.get('http://localhost:8080/api/user/cart/getall',config);
console.log('data type', typeof ((await data).data.listResult));


const cart = (await data).data.listResult;
console.log('data in cart get allll',cart);
const listproduct = Array.isArray(cart)?cart:[];


dispatch({type:'GET_ALL_PRODUCT', payload:listproduct});

}
export const DeleteToCart = (product) => async (dispatch) => {
    dispatch({type: 'DELETE_TO_CART', payload: product})
}

export const DeleteQtyProduct = (product) => async (dispatch) => {

    const token = localStorage.getItem('accessToken');
    const config = {
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        }
    }
    console.log('delete product id', product
    );
    try{
        const respone = axios.request({
            url:`http://localhost:8080/api/user/cart/delete`
            ,method:'DELETE',
            header:config.headers,
            data:[product.cartProductId]
        });
        dispatch({type:'DELETE_TO_CART', payload:product.productId})
    }
    catch(error)
    {
        console.log(error)
    }
   
}

