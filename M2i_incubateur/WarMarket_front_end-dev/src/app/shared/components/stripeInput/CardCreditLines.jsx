import { CreditCardIcon, TrashIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import visa from '../../../assets/images/visa.png'
import mastercard from '../../../assets/images/mastercard.png'
import { deleteCard } from '../../../api/backend/order';
import useModal from '../utils-components/Modal/useModal';
import ModalDeletCard from '../utils-components/Modal/modalCB/ModalDeletCard';


const CardCreditLines = ( props ) => {
    const [deletCard, setDeletCard]=useState("")
    const [expiryDate, setExpiryDate]=useState("")
    const [brand, setBrand]=useState("")
    const [last4, setLast4]=useState("")

    return (
       


<div className='h-full'>
            <div className="  p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-2 dark:bg-gray-800 dark:border-gray-700">
             <p className='font-bold text-2xl'>Liste des cartes enregistrées {props.size}/3 </p>
          
                <div className=" ">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        
                        {props.cards!==null? props.cards.map((element) =><>  <li class="py-3 sm:py-4">
                            <div className="flex items-center space-x-8">
                                <div className="flex-shrink-0">
                                {element.brand==='Visa'?<img className=' w-12' src={visa}/>:<img  className='w-12'src={mastercard}/>}                           </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                     ---- ---- ----  {element.last4}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {element.expiryDateMonth}  /   {element.expiryDateYear}                   </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                <button onClick={()=>{
                                    setDeletCard(element.cardStripe)
                                    setExpiryDate(element.expiryDateMonth +"/"+   element.expiryDateYear  )
                                    setLast4( " ---- ---- ----  "+element.last4 )
                                    setBrand(element.brand)
                                    props.deletCard(element.cardStripe)

                                    props.toggle()
                                }}>  <TrashIcon className='w-8 h-8'   ></TrashIcon>     </button>        </div>
                            </div>
                        </li></>):null}
             
                    </ul>
                </div>
            </div>

            <ModalDeletCard
            hide={ props.toggle}
                isShowing={props.isFormShowed}
                expiryDate={expiryDate}
                brand={brand}
                last4={last4}
                title="SUCCESS"
                cardStripe={deletCard}
                submit={()=>props.deletCard(deletCard)}
                confirm={()=>props.confirmDelet()}
            >
            </ModalDeletCard>
            
            </div>
    );
};

export default CardCreditLines;