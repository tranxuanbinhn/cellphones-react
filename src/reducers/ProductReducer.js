const initialState = {
    product:[],
    currentPage: 1,
    review:[]
}

export const getAllProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_PRODUCT':
           {

            //let currentProducts = Array.isArray(state.product.listResult) ? state.product.listResult : [];
            // 
            //////products = products.concat(action.payload.listResult);
            //// 
            //let payloadListResult = Array.isArray(action.payload.listResult) ? action.payload.listResult : [];
            // 
            //if(action.payload.page === 1)
            //{
            //    currentProducts = [];

            //}
            //let updatedProducts= currentProducts.concat(payloadListResult); 
  
         
           
            // 
            
            //action.payload.listResult = updatedProducts;

            // 
            return {...state, product: action.payload}
           }
        case 'GET_ALL_REVIEW_PRODUCT':{
            return {...state, allreviews: action.payload}
        }
        case 'GET_ALL_REVIEW_PRODUCT_ERROR':{
            return {...state, allreviews: action.payload}
        }
        case 'GET_ALL_PRODUCT_FAIL':
            return {...state, error: action.payload}

        case 'ASCENDING_PRODUCT':{
            let newList = [...state.product]
            newList = newList.sort((a,b) => b.salePrice - a.salePrice)
            return {...state, product: newList}
        }
        

        case 'DESCENDING_PRODUCT':{
            let newList = [...state.product]
            newList = newList.sort((a,b) => a.salePrice - b.salePrice)
            return {...state, product: newList}
        }
        case 'DELETE_ALL_PRODUCT':{
            return {...state, product: []}
        }

        case 'FILTER_PRODUCT':{
            let newList = [...state.product]
            newList = newList.filter(item => item.type === action.payload)
            return {...state, product: newList}
        }

        case 'FILTER_PRODUCT_BY_PRICE':{
           
            //let currentProducts = Array.isArray(state.product.listResult) ? state.product.listResult : [];
            // 
            
            //let payloadListResult = Array.isArray(action.payload.listResult) ? action.payload.listResult : [];
            //let updatedProducts  = currentProducts.concat(payloadListResult);
            // 
            //action.payload.listResult = updatedProducts;
            return {...state, product: action.payload}
        }
        
        case 'FILTER_PRODUCT_BY_RANDOM_FIELD':{
            return {...state, product: action.payload}
            // let newList = [...state.product]
            // for(var key in action.payload) {
            //     var value = action.payload[key];

            //     newList = newList.filter(item => item[key] === value)
            // }
            
            // return {...state, product: newList}
        }

        case 'SAVE_PRODUCT':{
            return {...state, product: action.payload}
        }

        case 'SAVE_PRODUCT_FAIL':{
            return {...state, error: action.payload}
        }

        case 'DELETE_PRODUCT':{
            return {...state, product: action.payload}
        }
            
        case 'DELETE_PRODUCT_FAIL':{
            return {...state, error: action.payload}
        }

        case 'EDIT_CURRENT_PAGE':{
            return {...state, currentPage: action.payload}
        }
        
        case 'PAGINATION_PRODUCT':
            return {...state, product: action.payload}

        default:
            return state
           
    }
}

// export const paginationProductReducer = (state = {}, action) => {
//     switch (action.type) {
//         case 'PAGINATION_PRODUCT':
//             return {...state, product: action.payload}
            
    
//         default:
//             return state
           
//     }
// }

export const getProductByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_BY_ID':{
            return {...state, product: action.payload}
        }

        case 'REMOVE_PRODUCT_BY_ID':{
            return {}
        }

        case 'REVIEW_PRODUCT':{
            return {...state, reviews: action.payload}
        }

        case 'REVIEW_PRODUCT_FAIL':{
            return {...state, error: action.payload}
        }

        case 'COMMENT_PRODUCT':{
            return {...state, product: action.payload}
        }

        case 'COMMENT_PRODUCT_FAIL':{
            return {...state, error: action.payload}
        }
        case 'GET_RATE':{
            return {...state, rate: action.payload}
        }
        case 'DELETE_RATE':{
            return {...state, rate:{}}
        }

        case 'REP_COMMENT_PRODUCT':{
            return {...state, product: action.payload}
        }

        case 'REP_COMMENT_PRODUCT_FAIL':{
            return {...state, error: action.payload}
        }

        case 'PIN_COMMENT_PRODUCT':{
            return {...state, product: action.payload}
        }

        case 'PIN_COMMENT_PRODUCT_FAIL':{
            return {...state, error: action.payload}
        }

        case 'BLOG_PRODUCT':{
            return {...state, product: action.payload}
        }

        case 'BLOG_PRODUCT_FAIL':{
            return {...state, error: action.payload}
        }

    
        default: return state
    }
}

export const searchProductReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SEARCH_PRODUCT':{
            return {...state, products: action.payload}
        }
        case 'CLEAR_SEARCH_PRODUCT':{
            return {...state, products: null}
        }


        case 'SEARCH_PRODUCT_FAIL':{
            return {...state, error: action.payload}
        }
    
        default: return state
    }
}


