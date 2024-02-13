import React from 'react';
import ListOrder from './../components/account/Order/ListOrder';
import Modal from 'react-modal';

function OrdersView() {

    Modal.setAppElement('#root');


    return (
        <div>
            <ListOrder />
        </div>
    )
}

export default OrdersView
