
export const CartReducer = (state = {cartItems: [],cartBuy:[]}, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            let newList = [...state.cartItems]
            const exists = newList.find(item => item._id === action.payload._id)
            if (exists) {
                newList = newList.map((item) => item._id === action.payload._id ? { ...exists, qty: exists.qty + 1 } : item)
            }else{
                const product = {
                    ...action.payload,
                    qty: 1,
                }
                newList.push(product);
            }

            localStorage.setItem('cartItems', JSON.stringify(newList))
            return {
                ...state,
                cartItems: newList
            }
        }
            
        case 'GET_ALL_PRODUCT_CART':{
            let newList = action.payload;
            console.log('newList is',newList);
            state.cartItems =[];
            console.log('cartItems emtpy',state.cartItems)
            return {
                ...state,
                cartItems:newList
            }
        }
        case 'GET_PRODUCT_BUY':{
            let newList = action.payload;
       
            state.cartItems =[];
            
            return {
                ...state,
                cartBuy:newList
            }
        }
        case 'DELETE_TO_CART': {
            let newList = [...state.cartItems.cartItems]
            const exists = newList.find(item => item._id === action.payload._id)
            if (exists.quantity === 1) {
                newList = newList.filter((item) => item.productId !== exists.productId)
            }else{
                newList = newList.map((item) => item.productId === action.payload ? { ...exists, qty: exists.quantity - 1 } : item)
            }
    
            localStorage.setItem('cartItems', JSON.stringify(newList))
            return {
                ...state,
                cartItems: newList
            };
        }
        case 'DELETE_WHEN_LOGOUT':{
            console.log('delete when logout')
            return {
                ...state,
                cartItems:undefined
            }
        }
            
        case 'DELETE_QTY_PRODUCT': {
            let newList = [...state.cartItems]
            
            newList = newList.filter((item) => item._id !== action.payload._id)
            
            localStorage.setItem('cartItems', JSON.stringify(newList))
            return {
                ...state,
                cartItems: newList
            };
        }

        case 'CART_EMTY':{
            return {...state, cartItems: []}
        }
        default:
            return state;
    }

}

