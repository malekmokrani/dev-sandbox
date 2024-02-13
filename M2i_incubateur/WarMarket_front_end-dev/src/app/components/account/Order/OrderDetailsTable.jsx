import React from "react";



const OrderDetailsTable = ({  productsOrder, total, status,  address, subTotal }) => {

 

    return (

     


                    <div className='grid content-between  border-b-2 border-gray-400 cartCard2 h-full p-2 mt-5 text-xs lg:text-sm'>
                        <div class="grid grid-cols-5 gap-4 w-full p-1 	">
                            <div className='w-full col-span-2'>  <h1 className='font-bold text-1xl '> Article</h1></div>
                            <div className='w-full text-center'>  <h1 className='font-bold text-1xl '> Prix HT €</h1></div>
                            <div className='w-full text-center'>  <h1 className='font-bold text-1xl '> Prix €</h1></div>

                            <div className='w-full text-center'>  <h1 className=' font-bold text-1xl '> Qte</h1></div>

                            {productsOrder !== undefined ? productsOrder.map(cart => <>
                                <div className='w-full col-span-2'><p className='text-xs'> {cart.label}</p></div>
                                <div className='w-full text-center'><p className='text-xs '> {(cart.price * 1).toFixed(2)}</p></div>
                                <div className='w-full text-center'><p className='text-xs '> {(cart.price * 1.2).toFixed(2)}</p></div>

                                <div className='w-full text-center'><p className='text-xs '> {cart.quantite}</p></div></>) : null}
                        </div>

                        <div class="grid grid-cols-3 gap-2 w-full p-3  border-t-2 border-gray-400 	">

                            <div className='w-full'><p className='text-xs'> Sous-total HT</p></div>
                            <div className='w-full text-center'><p className='text-xs '> </p></div>
                            <div className='w-full text-center'><p className='text-xs'> {(subTotal * 1).toFixed(2)}€</p></div>
                        </div>
                        <div class="grid grid-cols-3 gap-2 w-full p-3  	">

                            <div className='w-full'><p className='text-xs '> Sous-total </p></div>
                            <div className='w-full text-center'><p className='text-xs'> </p></div>
                            <div className='w-full text-center'><p className='text-xs '> {(subTotal * 1.2).toFixed(2)}€</p></div>
                        </div>
                        <div class="grid grid-cols-3 gap-2 w-full p-3 	">
                            <div className='w-full'><p className='text-xs'> Livraison  TTC</p></div>
                            <div className='w-full text-center'><p className='text-xs'> </p></div>
                            {(total * 1.2) < 25 ? <div className='w-full text-center'><p className='text-xs'> 10 €</p></div>
                                : <div className='w-full text-center'><p className='text-xs'> gratuit</p></div>}
                        </div>
                        <div className='flex border-b-2 border-gray-400 p-4 mr-5 ml-5 mt-1 mb-1'>
                            <h1 className='flex items-end font-bold text-4xl '></h1>
                        </div>
                        <div class="grid grid-cols-3 gap-2 w-full p-3 	">
                            <div className='w-full'><h1 className='flex items-end font-bold text-1xl'>
                                Total (TTC)</h1></div>
                            <div className='w-full text-center'><p className='text-xs font-bold  '> </p></div>
                            {<div className='w-full text-center'><p className='text-xsfont-bold '> {((total * 1).toFixed(2))}€</p></div>



                            }
                        </div>

                        <p className="font-bold text-xs mt-4">Status: {status}</p>
                        <p className="font-bold text-xs mt-4">Addresse: {address}</p>



                    </div>



                


         







    );
};

export default OrderDetailsTable;