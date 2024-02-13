import React, { useState, useEffect } from 'react';
import { getOrdersDetails } from './../../../api/backend/order';
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '5%',
        bottom: '5%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function OrderDetail({ orderId, modalIsOpen, setModalIsOpen }) {

    const [orderDetail, setOrderDetail] = useState([]);
    const [isLoad, setIsLoad] = useState(false);



    useEffect(() => {
        if (modalIsOpen) {
            getOrdersDetails(orderId).then(response => {
                setOrderDetail(response.data);
                setIsLoad(true);
            });
        }
    }, [modalIsOpen, orderId]);


    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => !modalIsOpen}
            style={customStyles}

        >
            <>
                <div className='flex justify-end'>
                    <button onClick={() => setModalIsOpen(!modalIsOpen)} className='text-red-700 font-bold text-2xl '>&#x24CD;</button>
                </div>
                <div className="md:grid md:grid-cols-2 lg:grid-cols-3">
                    {isLoad ?
                        orderDetail.map((order) => {
                            return (
                                <React.Fragment key={order.id}>
                                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                        <div className='flex justify-center'>
                                            <img className="w-2/5 mt-8" src={order.picture} alt="Mountain" />
                                        </div>
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">{order.label}</div>
                                            <p className="text-gray-700 text-base">
                                                quantité : {order.quantite}
                                            </p>
                                            <p className="text-gray-700 text-base">
                                                prix : {(order.price*1).toFixed(2)} € H.T.
                                            </p>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        }) : <><h1>Loading...</h1></>}
                </div>
            </>
        </Modal >
    )
}

export default OrderDetail;
