const initialState = null; 
export const TokenReducer = (state = initialState, action)=>{
    switch(action.type)
    {
        case 'active':
        {
            return true;
        }
        case 'expired':
        {
            return false;
        }
        default:
             return state;
    }
}