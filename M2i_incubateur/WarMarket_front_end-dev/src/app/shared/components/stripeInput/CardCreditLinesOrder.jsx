import { CreditCardIcon, TrashIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import visa from '../../../assets/images/visa.png'
import mastercard from '../../../assets/images/mastercard.png'
import { deleteCard } from '../../../api/backend/order';
import useModal from '../utils-components/Modal/useModal';
import ModalDeletCard from '../utils-components/Modal/modalCB/ModalDeletCard';


const CardCreditLinesOrder = (props) => {
    const [selectCard, setSelectCard] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [brand, setBrand] = useState("")
    const [last4, setLast4] = useState("")

    return (



        <div className='h-full'>

            <div className="  p-4 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">

                <div className="text-center w-full">
                    <h1 className="font-bold m-2">AUTORISATION DE VOTRE CARTE DE CRÉDIT:</h1>
                    <p className="mb-5 text-sm">
                        Il n'est pas rare qu'une demande d'autorisation de carte de crédit soit refusée une ou deux fois avant que la carte soit finalement autorisée.</p>
                    <p className="mb-5 text-sm">
                        Nous vous transmettrons un courriel en cas de difficulté lors de l'autorisation de votre carte de crédit.</p></div>
                {<div><p className="font-bold text-3xl mb-8">Tot a payer : {props.tot}€</p></div>}
                <div className=" ">
                    <ul role="list" className="divide-y border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-lg divide-gray-200 dark:divide-gray-700 mb-10 pl-5 pr-5">

                        {props.cards !== null ? props.cards.map((element, index) => <>  <li class="py-3 sm:py-4">
                            <div className="flex items-center space-x-8">
                                <div className="flex-shrink-0">
                                    {element.brand === 'Visa' ? <img className=' w-12' src={visa} /> : <img className='w-12' src={mastercard} />}                           </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        ---- ---- ----  {element.last4}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {element.expiryDateMonth}  /   {element.expiryDateYear}                   </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <div class="flex mt-2 mb-2">
                                        <input onClick={() => {

                                            setSelectCard(element.cardStripe)
                                            setExpiryDate(element.expiryDateMonth + "/" + element.expiryDateYear)
                                            setLast4(" ---- ---- ----  " + element.last4)
                                            setBrand(element.brand)

                                        }} className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600
                                         focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left ml-5"
                                            type="checkbox" checked={selectCard === element.cardStripe ? true : false} id="flexCheckChecked" />
                                    </div>
                                </div>
                            </div>
                        </li></>) : null}

                    </ul>

                </div>
                <div className='h-24'>

                    {selectCard !== "" ? <button className={!props.disabled?'validateCart animate-wiggle':'validateCart animate-pulse'}disabled ={props.disabled} onClick={() => props.submit(selectCard)}>PAYER!</button>

                        : null}</div>


            </div>

        </div>
    );
};

export default CardCreditLinesOrder;