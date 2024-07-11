import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard';
import AdminProduct from './AdminProduct/AdminProduct';
import AdminCreate from './AdminProduct/AdminCreate';
import AdminUserUpdate from './AdminUser/AdminUserUpdate';
import AdminUpdate from './AdminProduct/AdminUpdate'
import AdminOrder from './AdminOrder/AdminOrder'
import AdminUser from './AdminUser/AdminUser';
import AppChat from './AppChat/AppChat'
import ReviewProduct from './AdminProduct/ReviewProduct/ReviewProduct';
import DataFilterProduct from './AdminProduct/DataFilterProduct/DataFilterProduct';
import AdminUserCreate from './AdminUser/AdminUserCreate';
import AdminProductDetail from './AdminProduct/AdminProductDetail';

function Routes(props) {
    return (
        <Switch>
            <Route path='/admin/' exact component={Dashboard}/>
            <Route path='/admin/customer' component={AdminUser}/>
            <Route path='/admin/user/create' component={AdminUserCreate}/>
            <Route path='/admin/product/create' component={AdminCreate}/>
            <Route path='/admin/user/update/:id' component={AdminUserUpdate}/>
            <Route path='/admin/product/detail/:id' component={AdminProductDetail}/>
            <Route path='/admin/product/update/:id' component={AdminUpdate}/>
            <Route path='/admin/product/reviewProduct/:id' component={ReviewProduct}/>
            <Route path='/admin/product' component={AdminProduct}/>

            <Route path='/admin/order' component={AdminOrder}/>
            <Route path='/admin/chat' component={AppChat}/>
        </Switch>
    );
}

export default Routes;