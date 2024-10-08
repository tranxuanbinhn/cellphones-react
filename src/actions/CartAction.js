import axios from "axios";
export const AddToCart = (product,check) => async (dispatch) => {
    
     
    const url = `${process.env.REACT_APP_API_ENDPOINT}/api/user/cart/add`;
    const cart = {
        productId:product.id,
        quantityProduct:1,
        add:check
    }
    const token = localStorage.getItem('accessToken');
     
    const config = {
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        }
    }
    const respone = axios.post(url, cart,config);
     
    //dispatch({type: 'ADD_TO_CART', payload: product})
     

}
export const AddToCart2 = (product,check) => async (dispatch) => {
    
  
    const url = `${process.env.REACT_APP_API_ENDPOINT}/api/user/cart/add`;
    const cart = {
        productId:product.productId,
        quantityProduct:1,
        add:check
    }
    const token = localStorage.getItem('accessToken');
     
    const config = {
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        }
    }
    const respone = axios.post(url, cart,config);
     
    ////dispatch({type: 'ADD_TO_CART', payload: product})
    // 

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
     
    const cart = response.data.listResult;

const listproduct = Array.isArray(cart)?cart:[];    


dispatch({type:'GET_ALL_PRODUCT_CART', payload:listproduct});
 }).catch(error=>{
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
         
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
                         
                        dispatch({type:'expired'});
                        
                    }
            }).catch(error=>{
                if(error.response)
                    {
                         
                        dispatch({type:'expired'});

                    }
            })
        }   
        }
 })
// 




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
         
    }
   
}

