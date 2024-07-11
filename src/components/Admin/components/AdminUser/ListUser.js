import React from 'react';
import User from './User';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { editCurrentPage,getAllUser } from '../../../../actions/UserAction';
function ListUser(props) {
    const dispatch = useDispatch();
    const {users} = props;
    const usersList = users?.listResult;
    const currentPage = useSelector(state=>state.users.currentPage);
    const HandleChangePage = async (number) => {
        console.log('number', number)
        await dispatch(getAllUser(number))
        dispatch(editCurrentPage(number))
    }
    return (
        <div className="admin-user-list">
            <table>
                <tr>
                    <th></th>
                    <th>User name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Phone</th>
                </tr>
                {
                    usersList.map((item, index) => (<User user={item} number={index}></User>))
                }
            </table>
            <div className="pagination">
                <Pagination defaultCurrent={1} current={currentPage} total={users?.totalItems} pageSize={2} onChange={HandleChangePage}/>
            </div>
            
        </div>
    );
}

export default ListUser;