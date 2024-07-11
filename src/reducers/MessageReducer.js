import { message } from "antd";

export const Message = (state = {}, action) => {
    switch (action.type) {
        case 'MESSAGE_ERROR':
            return {...state, error: action.payload };
        case 'MESSAGE_SUCCESS':
            return {...state, success: action.payload };
        case 'USERNAME_EXIST':
            return {...state, error: action.payload };
        case 'GMAIL_EXIST':
            return {...state, error: action.payload };
        case 'NUMBERPHONE_EXIST':
            return {...state, error: action.payload };
        case 'MESSAGE_SUCCESS':
            return {...state, success: action.payload };
        default:
            return state;
    }
};