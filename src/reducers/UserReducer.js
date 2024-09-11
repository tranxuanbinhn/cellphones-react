
export const UserSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOGIN_SUCCESS':
            return {...state, userInfo: action.payload };
        case 'USER_LOGIN_FAIL':
            return {...state, error: action.payload };
        case 'USER_LOGOUT':
            return {};
      default:
        return state;
    }
};

export const UserSignupReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_SIGNUP_SUCCESS':
            return {...state, userInfo: action.payload };
        case 'USER_SIGNUP_FAIL':
            return {...state, error: action.payload };
        default:
            return state;
    }
};

export const UserSignoutReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_SIGNOUT_SUCCESS':
            {
                 
                return {...state,userInfo:action.payload };
            }
            
        default:
            return state;
    }
};

export const getAllUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ALL_USER':{
            return {...state, user:action.payload}
        }
        case 'GET_USER_DETAIL':{
            return {...state, userdetail:action.payload}
        }
        case 'UPDATE_USER':{
            return {...state, updateuser:action.payload}
        }
        case 'ADD_USER':{
            return {...state, adduser:action.payload}
        }
        case 'DELETE_USER':{
            return {...state}
        }
        case 'GET_ALL_ROLE':{
            return {...state, roles:action.payload}
        }
        case 'USER_CURRENT_PAGE':{
            return {...state, currentPage:action.payload}
        }

        default: return state
    }
}

// export const deleteUserReducer = (state = {}, action) => {
//     switch (action.type) {
        
            
//         default: return state
//     }
// }