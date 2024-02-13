import React, { useState, useEffect } from 'react';
import { getAllOrders, getOrders } from '../../../api/backend/order';
import Orders from './Orders';
import OrderDetail from './OrderDetail';
import { URL_ORDERS_COMMERCIAL } from '../../../shared/constants/urls/urlConstants';
import { hasRole } from '../../../shared/services/accountServices';
import { ROLE_SALESMAN } from '../../../shared/constants/rolesConstant';


function ListOrder() {

    const [orders, setOrders] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [orderId, setOrderId] = useState();

    useEffect(() => {
        if (window.location.pathname !== URL_ORDERS_COMMERCIAL) {
            getOrders().then(response => {
                setOrders(response.data);
                setIsLoad(true);
            });
        } else {

            if (hasRole(ROLE_SALESMAN)) {
                getAllOrders().then(response => {
                    setOrders(response.data);
                    setIsLoad(true);
                });
            }
        }

    }, []);

    const showModal = (id) => {
        setOrderId(id);
        setModalIsOpen(true);
    }


    return (
        <>
            <div className='text-center bodyTable m-8'>
                <div className='md:grid md:grid-cols-5 headerTable p-8'>
                    <div><p>Numéro de commande</p></div>
                    <div><p>Date</p></div>
                    <div><p>Status</p></div>
                    <div><p>Prix</p></div>
                    <div><p>Détails</p></div>
                </div>
                {isLoad ?
                    <>
                        {orders.map((order) => {
                            return (
                                <Orders
                                    key={order.id}
                                    order={order}
                                    showModal={showModal}
                                />
                            )
                        })}
                    </> : <><h1>Loading...</h1></>}
            </div>
            <OrderDetail
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                orderId={orderId}
            />
        </>
    )

}

export default ListOrder;
