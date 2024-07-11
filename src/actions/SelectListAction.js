import axios from "axios";

export const getAllSelectList = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('accessToken');
        
        const {data} = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/admin/category/getall`, 
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            }
            )
        console.log('category notnull',data);
        dispatch({type: 'GET_ALL_SELECT_LIST', payload: data?.listResult})
    } catch (error) {
    }
}
export const getAllBrand = () => async (dispatch) => {
    try {
    

        const token = localStorage.getItem('accessToken');
    
        const {data} = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/admin/brand`, 
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            }
            )
        console.log('dataakjd',data);
        dispatch({type: 'GET_ALL_BRAND', payload: data?.listResult})
    } catch (error) {
        console.log('error', error);
    }
}

export const CreateSelectListItem = (item) => async (dispatch) => {
    try {
        const {data} = await axios.post('http://localhost:4000/selectList/create', item)
        dispatch({type: 'CREATE_SELECT_LIST_ITEM', payload: data})
    } catch (error) {
    }
}

export const UpdateSelectListItem = (item) => async (dispatch) => {
    try {
        const {data} = await axios.put(`http://localhost:4000/selectList/update/${item._id}`, item)
        dispatch({type: 'UPDATE_SELECT_LIST_ITEM', payload: data})
    } catch (error) {
    }
}

export const getSelectListItemById = (id) => async (dispatch) => {
    try {
        const {data} = await axios.get(`http://localhost:4000/selectList/detail/${id}`)
        dispatch({type: 'GET_SELECT_LIST_ITEM_BY_ID', payload: data})
    } catch (error) {
    }
}

export const deleteSelectListItemById = (id) => async (dispatch) => {
    try {
        const {data} = await axios.delete(`http://localhost:4000/selectList/delete/${id}`)
        dispatch({type: 'DELETE_SELECT_LIST_ITEM_BY_ID', payload: data})
    } catch (error) {
    }
}