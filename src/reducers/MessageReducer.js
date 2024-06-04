export const Message = (state = {}, action) => {
    switch (action.type) {
        case 'MESSAGE_ERROR':
            return {...state, userInfo: action.payload };
        case 'MESSAGE_SUCCESS':
            return {...state, userInfo: action.payload };
        default:
            return state;
    }
};