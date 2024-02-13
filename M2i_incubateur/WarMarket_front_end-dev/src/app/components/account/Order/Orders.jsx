import { SearchCircleIcon } from '@heroicons/react/solid';
import React from 'react';
import { useHistory } from 'react-router-dom';


function Orders({ order, showModal }) {
    const history = useHistory();

    return (
        <div className='md:grid md:grid-cols-5 p-6 border-b-2'>
            <div className='p-2'><p>{order.id}</p></div>
            <div className='p-2'><p>{order.dateDDMMYYYY}</p></div>
            <div className='p-2'><p>{order.status.label}</p></div>
            <div className='p-2'><p>{(order.total*1).toFixed(2)} € TTC</p></div>
           
           
            <div className='grid grid-cols-2  '>
                
                <button className='  h-8 w-8 '><SearchCircleIcon 
             onClick={() => showModal(order.id)}></SearchCircleIcon>  </button> 



         <button  className='  h-8 w-full '><div className='detailOrder ' onClick={() => {
                    history.push(`/order/detail/${order.id}`)
                }} > <p className='uppercase'>Détails</p></div></button> 
            </div>
        </div>
    )
}

export default Orders;
