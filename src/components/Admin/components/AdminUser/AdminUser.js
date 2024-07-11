import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../../../actions/UserAction';
import ListUser from './ListUser';
import './AdminUser.css';
import { Link } from 'react-router-dom';
import { AppstoreAddOutlined, ToolOutlined } from "@ant-design/icons";


function AdminUser(props) {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.user);
    const page = useSelector(state => state.users.currentPage);

    console.log('user',users);
    const {listResult} = users;

    useEffect(() => {
        dispatch(getAllUser(page))
    }, [])
    return (
        <div className="admin-user">
            <Link to="/admin/user/create" className="add-product">
          <AppstoreAddOutlined />
        </Link>
            <span>Customers</span>
            {
                listResult ? (<ListUser users={users}></ListUser>) : (<h2> Loading</h2>)
            }
        </div>
    );
}

export default AdminUser;