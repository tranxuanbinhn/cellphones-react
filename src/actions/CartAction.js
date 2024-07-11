import axios from "axios";
export const AddToCart = (product,check) => async (dispatch) => {
    
    console.log('check', product);
    const url = `${process.env.REACT_APP_API_ENDPOINT}/api/user/cart/add`;
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
    
  
    const url = `${process.env.REACT_APP_API_ENDPOINT}/api/user/cart/add`;
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
    ////dispatch({type: 'ADD_TO_CART', payload: product})
    //console.log('respones', respone);

}
export const GetAllProductInCart = () =>async (dispatch)=>{
    const token = localStorage.getItem('accessToken');
const config = {
    headers:{
        Authorization:`Bearer ${token}`,
        'Content-Type':'application/json'
    }
}
 axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/user/cart/getall`,config).then(response=>{
    console.log('data cart',response.data);
    const cart = response.data.listResult;

const listproduct = Array.isArray(cart)?cart:[];    


dispatch({type:'GET_ALL_PRODUCT_CART', payload:listproduct});
 }).catch(error=>{
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('token', error.response.status);
        if(error.response.status === 500){
            const refreshToken = localStorage.getItem('refreshToken');
            const option = {
                method:'post',
                url:`${process.env.REACT_APP_API_ENDPOINT}/api/auth/refreshtoken`,
                data: {
                    refreshToken :refreshToken
                }
            }


            axios.request(option).then(response =>{
                    if(response.status === 200)
                    {
                        const data = response.data;
                        localStorage.setItem('accessToken', data.accessToken);
                        dispatch({type:'active'});
                    }
                    else{
                        console.log('erro')
                        dispatch({type:'expired'});
                        
                    }
            }).catch(error=>{
                if(error.response)
                    {
                        console.log('Error',error.response);
                        dispatch({type:'expired'});

                    }
            })
        }   
        }
 })
//console.log('data cart',data);




}
export const CartToBuy = (product) =>async (dispatch)=>{
dispatch({type:'GET_PRODUCT_BUY', payload: product});
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
    console.log('delete product id', product);
    try{
        const respone = axios.request({
            url:`${process.env.REACT_APP_API_ENDPOINT}/api/user/cart/delete`
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

