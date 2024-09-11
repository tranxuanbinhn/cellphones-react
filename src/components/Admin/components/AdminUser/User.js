import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, getAllUser ,resetPasswordUser} from '../../../../actions/UserAction';
import { DeleteOutlined,EditOutlined, WarningOutlined} from '@ant-design/icons';
import { useHistory, Link } from 'react-router-dom';
import { Button } from 'antd';
function User(props) {
    const {user, number} = props
    const dispatch = useDispatch()
    const history = useHistory(); 
     
    const handleDeleteUser = async (user) => {
    
        await dispatch(deleteUser(user.id))
        dispatch(getAllUser(1));
       
        
    }
    const handleResetPassword = async () => {
        await dispatch(resetPasswordUser(user))
        dispatch(getAllUser(1));
    }

    return (
        <tr>
            <td>{number + 1}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.phonenumber}</td>
        <td className="update-product">
        <Link to={`/admin/user/update/${user.id}`}>
          <EditOutlined></EditOutlined>
        </Link>
      </td>
      <td className="review-product">

          <span className='reset-password' onClick={()=> handleResetPassword(user)}><p className='text_reset_password'>Reset password</p> <WarningOutlined></WarningOutlined></span>
        
      </td>
            <td className="delete-user"onClick={() => handleDeleteUser(user)}><DeleteOutlined /></td>
        </tr>
    );
}

export default User;