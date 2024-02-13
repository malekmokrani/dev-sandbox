import React from 'react';
import { useDispatch } from "react-redux";
import { add, selectCart } from '../../../shared/redux-store/cartSlice';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import { useHistory } from 'react-router-dom';
import ModalAddToCart from '../../../shared/components/utils-components/Modal/ModalAddToCart';
import useModal from '../../../shared/components/utils-components/Modal/useModal';
import { useSelector } from 'react-redux';

import ButtonFavorite from '../../../shared/components/buttons/ButtonFavorite';


/**
 * Creation of a component Product.jsx to display the products
 * 
 * @author Jeremy Dejonghe
 */
export const Products = ({ label, price, stock, id, picture, universe, displayGrid }) => {
    const product = { "id": id, "label": label, "price": price, "stock": stock, "quantite": 1, "picture": picture }
    const dispatch = useDispatch();
    const history = useHistory();
    const { isShowing: isAddressFormShowed, toggle: toggleAddressForm } = useModal();
    const carts = useSelector(selectCart);


    const quantity = () => {
        var cartFind = carts.find(x => x.id === id)
        if (cartFind !== undefined) {
            return cartFind.quantite

        } else { return 0 }
    }

    return (
        <div className={displayGrid 
                            ?
                        "p-4 m-2 Cardproduct md:w-11/12 w-full"
                            :
                        "p-4 m-4 Cardproduct w-full max-w-screen-lg"
                        }>
            <div className="">
            
                        <div className={displayGrid 
                                            ? 
                                        'bg-white p-2 md:p2 md:flex-col md:block'
                                            :
                                        'bg-white p-2 flex items-center justify-between block' }>
                            <img src={picture}
                                alt={label}
                                className={
                                            displayGrid 
                                                    ? 
                                            "w-full hover:cursor-pointer mr-4"
                                                : 
                                            "w-20 h-20 mr-4 hover:cursor-pointer "
                                        }
                                onClick={() => history.push(`/produits/detail/${id}`)} />
                            
                            
                            <div className='clip-path productCard p-4 flex-1 w-full overflow-hidden'>

                                {universe != undefined && (<span className='block text-center mt-3 text-xl'>{universe.label}</span>)}


                                <h2 className="m-2 text-center font-bold truncate">{label}</h2>

                                <div className="flex justify-evenly items-center w-100 mb-2">

                                    <div className="price justify-start rounded-2xl p-3">
                                        <p className="font-bold text-white">{price} € H.T.</p>
                                    </div>

                                    <div className="flex">
                                        <ButtonFavorite id={id} />
                                        <div className="login rounded-xl m-1 p-3 hover:cursor-pointer">
                                            <ShoppingCartIcon   width={32}   height={32}
                                                                onClick={() => {
                                                                    dispatch(add(product))
                                                                    toggleAddressForm() }} />
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    
            </div>
            <ModalAddToCart
                isShowing={isAddressFormShowed}
                hide={toggleAddressForm}
                cart={product}
                qty={quantity()}
            >
            </ModalAddToCart>
        </div>
    )
}
