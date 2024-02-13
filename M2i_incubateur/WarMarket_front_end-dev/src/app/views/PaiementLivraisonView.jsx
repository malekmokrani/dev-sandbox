import React from 'react';
import { useSelector } from "react-redux";
import { selectCart } from "../shared/redux-store/cartSlice";
import useModal from '../shared/components/utils-components/Modal/useModal';
import ModalAddress from '../shared/components/utils-components/Modal/modalAddress/ModalAddress';
import { setLivraison, selectLivraison } from "../shared/redux-store/livraisonSlice"
import { useDispatch } from 'react-redux';
import { CheckIcon } from '@heroicons/react/solid';
import { useEffect } from 'react';
import { ButtonToPayer } from '../shared/components/buttons/ButtonToPayer';
import { getProfile } from '../api/backend/user'
const PaiementLivraisonView = () => {
    const { isShowing: isAddressFormShowed, toggle: toggleAddressForm } = useModal();
    const liv = useSelector(selectLivraison);
    const carts = useSelector(selectCart)
    const dispatch = useDispatch();
    const test = () => {
        try {
          if( JSON.parse(localStorage.getItem('myAddress')).number!==null) 
           { return true}
        } catch { return false }
    }
    useEffect(() => {
        
      
        if (test()===false) {
            localStorage.setItem("idAddress", 0)
            localStorage.removeItem("myAddress")
            getProfile().then(res => {
                localStorage.setItem("idAddress", res.data.idaddress)
                dispatch(setLivraison({
                    number: res.data.number,
                    street: res.data.street,
                    additionalAddress: res.data.additionalAddress,
                    postalCode: res.data.postalCode,
                    city: res.data.city,
                    country: res.data.country,
                    isMain: false
                }))


            })
        }
    }, [])


    let subTotal = 0;
    for (let i = 0; i < carts.length; i++) {
        subTotal += carts[i].quantite * carts[i].price
    }
    const submit = (value) => {
        dispatch(setLivraison(value))
        toggleAddressForm()
    }

   


    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 cursor-default m-5 p-5 flex justify-around m-5'>


            <ModalAddress
                isShowing={isAddressFormShowed}
                hide={toggleAddressForm}
                title="Indiquer mon adresse"
                submit={submit}
            >
            </ModalAddress>

            <div className='lg:w-2/3'>
                <div className='flex border-b-2 border-gray-400 pb-4 mb-5 col-span-2'>
                    <h1 className='flex items-end font-bold text-4xl ml-4'>Livraison</h1>

                </div>
              


                <div className='flex border-b-2 border-gray-400 pb-4'>
                    <h1 className='flex items-end font-bold text-2xl ml-4'>En magasin ( gratuit )</h1>
                </div>
                <div className='flex  border-b-2 border-gray-400 mt-5   cartCard '>
                    <div className="lg:w-full ml-10 ">    <p className="text-sm mt-10 pb-10 border-b-2 ">
                        La livraison est toujours gratuite en magasin Games Workshop ou Warhammer, sans exigence de montant minimum ni de pacte avec les dieux du Chaos.

                    </p></div>
                    <div className="lg:w-1/8  ">   </div>

                    <div className='flex justify-end self-end m-2 text-sm	'>
                        <button className="paiementCart h-12 w-24" onClick={() => alert("Choisir un magasin")/*validate(carts)*/}>Choisir un magasin</button>
                    </div>
                </div>



                <div className='flex border-b-2 border-gray-400 pb-4 mt-5 '>
                    <h1 className='flex items-end font-bold text-2xl ml-4'>A domicile (gratuit a partir de 25 €) </h1>

                </div>
                <div className='flex  border-b-2 border-gray-400   cartCard '>

                    <div className="lg:w-full ml-10 ">


                        <p className="text-sm mt-10 pb-10 border-b-2 ">
                            Le port Standard coûte 10€ et il est OFFERT pour toute commande de plus de 25€. Tous les frais de port incluent les taxes et frais de douane.

                        </p>
                        <div className="lg:w-1/8  flex justify-end self-end p-1 ">
                            {test()&& liv !== null ? <> <CheckIcon className='md:w-12 h-12 iconTrue' />
                                <p className='text-xs p-5'>
                                    {JSON.parse(localStorage.getItem('myAddress')).number + "   "
                                        + JSON.parse(localStorage.getItem('myAddress')).street + "   "
                                        + JSON.parse(localStorage.getItem('myAddress')).city + "   " + JSON.parse(localStorage.getItem('myAddress')).postalCode + "  "
                                        + JSON.parse(localStorage.getItem('myAddress')).country }

                                </p>
                            </> : null}  </div>

                    </div>
                    <div className="lg:w-1/8  flex justify-end self-end p-1 ">
                    </div>

                    <div className='flex justify-end self-end m-2 text-sm	'>

                        <button className="paiementCart h-24 lg:h-12  lg:w-48" onClick={toggleAddressForm}><p className='uppercase'>Indiquer mon adresse</p></button>

                    </div>

                </div>



                <div className='flex border-b-2 border-gray-400 pb-4 mt-5 '>
                    <h1 className='flex items-end font-bold text-2xl ml-4'>
                        Récapitulatif d’achat</h1>
                </div>
                <div className='flex  border-b-2 border-gray-400   cartCard '>

                    <div class="grid grid-cols-4 gap-2 w-full p-3 	">
                        <div className='w-full'>  <h1 className='font-bold text-1xl '> Article:</h1></div>
                        <div className='w-full text-center'>  <h1 className='font-bold text-1xl '> Prix HT €</h1></div>
                        <div className='w-full text-center'>  <h1 className='font-bold text-1xl '> Prix TTC €</h1></div>

                        <div className='w-full text-center'>  <h1 className=' font-bold text-1xl '> Quantite</h1></div>

                        {carts.map(cart => <>
                            <div className='w-full'><p className='text-sm '> {cart.label}</p></div>
                            <div className='w-full text-center'><p className='text-sm '> {(cart.price * 1).toFixed(2)}</p></div>
                            <div className='w-full text-center'><p className='text-sm '> {(cart.price * 1 * 1.2).toFixed(2)}</p></div>

                            <div className='w-full text-center'><p className='text-sm '> {cart.quantite}</p></div></>)}
                    </div>
                </div>

                <div className='w-full'>   {localStorage.getItem('myAddress') !== undefined ? <div className='flex justify-end	 w-full p-5	'><ButtonToPayer></ButtonToPayer></div>
                    : null}

                </div>
                <div className='flex border-b-2 border-gray-400 pb-4 mt-5 '>
                    <h1 className='flex items-end font-bold text-2xl ml-4'>
                        Total</h1>
                </div>

                <div className='  border-b-2 border-gray-400   cartCard '>

                    <div class="grid grid-cols-3 gap-2 w-full p-3 	">
                        <div className='w-full'><p className='text-sm '> Sous-total HT </p></div>
                        <div className='w-full text-center'><p className='text-sm '> </p></div>
                        <div className='w-full text-center'><p className='text-sm '> {(subTotal * 1).toFixed(2)}€</p></div>
                    </div>
                    <div class="grid grid-cols-3 gap-2 w-full p-3 	">
                        <div className='w-full'><p className='text-sm '> Tot TVA </p></div>
                        <div className='w-full text-center'><p className='text-sm '> </p></div>
                        <div className='w-full text-center'><p className='text-sm '> {(subTotal * 0.2).toFixed(2)}€</p></div>
                    </div>
                    <div class="grid grid-cols-3 gap-2 w-full p-3 	">
                        <div className='w-full'><p className='text-sm '> Livraison</p></div>
                        <div className='w-full text-center'><p className='text-sm '> </p></div>
                        {(subTotal * 1.2) < 25 ? <div className='w-full text-center'><p className='text-sm '> 10 €</p></div>
                            : <div className='w-full text-center'><p className='text-sm '> gratuit</p></div>}
                    </div>
                    <div className='flex border-b-2 border-gray-400 p-4 mr-5 ml-5 mt-1 mb-1'>
                        <h1 className='flex items-end font-bold text-4xl '></h1>
                    </div>
                    <div class="grid grid-cols-3 gap-2 w-full p-3 	">
                        <div className='w-full'><h1 className='flex items-end font-bold text-1xl'>
                            Total (TVA incluse)</h1></div>
                        <div className='w-full text-center'><p className='text-sm font-bold  '> </p></div>
                        {(subTotal * 1.2) < 25 ? <div className='w-full text-center'><p className='text-sm font-bold '> {((subTotal * 1.2) + 10).toFixed(2)}€</p></div>
                            : <div className='w-full text-center'><p className='text-sm font-bold '> {(subTotal * 1.2).toFixed(2)}€</p></div>}                    </div>

                </div>



            </div>
            <div></div>
        </div>
    );
};

export default PaiementLivraisonView;