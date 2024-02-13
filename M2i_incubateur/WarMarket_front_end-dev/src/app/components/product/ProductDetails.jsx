import React, { useEffect } from "react";
import { CheckIcon, XIcon, ShoppingCartIcon, RefreshIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from "react-redux";
import { add, remove, selectCart, setQuantity } from '../../shared/redux-store/cartSlice';
import { useState } from "react";
import useModal from "../../shared/components/utils-components/Modal/useModal";
import ModalAddToCart from "../../shared/components/utils-components/Modal/ModalAddToCart";
import { CheckCircleIcon, PencilIcon, XCircleIcon } from "@heroicons/react/outline";
import ProductRelated from "./components-page-product/ProductRelated";
import ButtonFavorite from "../../shared/components/buttons/ButtonFavorite";

/**
 * Component product to show details
 * @param label
 * @param price
 * @param description
 * @returns show details product

 */
const ProductDetails = ({ label, price, description, picture, stock, id, cart, cartQuantity, productRelated }) => {
    const [quantity, setQuantityNew] = useState()
    const product = { "id": id, "label": label, "price": price, "stock": stock, "quantite": quantity, "picture": picture }
    const dispatch = useDispatch();
    const carts = useSelector(selectCart)
    var getQuantity = () => { if (cartQuantity !== undefined) { return cartQuantity } else { return "0" } }
    const [errorQty, setErrorQty] = useState("")
    const { isShowing: isAddressFormShowed, toggle: toggleAddressForm } = useModal();
    const [modalQty, setModalQty] = useState(0)
    const [isEnable, setEnabled] = useState(false);
    const [inputField, setInputField] = useState(undefined);
    const styleShowBtn = ' mt-2';
    const styleHideBtn = ' hidden';




    useEffect(() => {
        if (isEnable && inputField != undefined) {

        }
    }, [isEnable])


    const cancelHandler = (event) => {

        toggle(event.currentTarget)

        var cartFind = carts.find(x => x.id === id)
        if (cartFind !== undefined) {
            document.getElementById("myNumberInput").value = cartFind.quantite
            setQuantityNew(cartFind.quantite)
            setErrorQty('')

        }
        else {
            document.getElementById("myNumberInput").value = 0
            setQuantityNew(0)
        }
        setErrorQty('')


    }

    const toggle = (target) => {


        if (inputField == undefined) setInputField(target.parentNode.parentNode.childNodes[1].firstChild);// input Field
        setEnabled(!isEnable);

    }




    const handleChange = event => {
        let { value, min, max } = event;

        if (isNaN(parseInt(value, 10))) {
            value = 0

            document.getElementById("myNumberInput").value = 0;
        }

        document.getElementById("myNumberInput").value = parseInt(value, 10);
        if (value === "") {
            value = 0
            document.getElementById("myNumberInput").value = 0
            setQuantityNew(0)

        }

        if (+value >= +min && +value <= +max) {
            setQuantityNew(parseInt(value, 10))
            setErrorQty('')
        }
        else if (value < 0) {
            setQuantityNew(0)

            setErrorQty('  La quantité doit être supérieure à 0')
        }

        else {

            setErrorQty('Quantité non disponible en stock(' + stock + "max)")
        }

    };

    return (
        <>
            <div className=" w-full  sm:mt-10 md:mt-10 lg:mt-20">
                <div className="flex flex-wrap w-full justify-around"  >

                    <div className="border-t-2 border-gray-400 max-w-screen-xl flex flex-col lg:flex lg:flex-row">
                        <div className="lg:w-1/2 ">
                            <img
                                className="mt-10 mb-4 border-2 border-gray-400"
                                src={picture}
                                alt=""
                            />
                        </div>
                        <div className="lg:w-1/2 ml-10 ">
                            <div>
                                <div className="flex justify-end">
                                    <h1 className="font-bold text-3xl mt-10">{label}</h1>
                                    <div className="mt-8">
                                        <ButtonFavorite id={id} />
                                    </div>
                                </div>

                                <h2 className="font-bold text-2xl mt-10">Prix: {price} € H.T.</h2>
                                <p className="text-xl mt-10 pb-10 border-b-2 border-gray-400">{description}</p>
                            </div>
                            <div>
                                <p className='font-bold flex items-center text-2xl mt-10'>
                                    En Stock({stock})
                                    {stock > 0 ? <CheckIcon className='ml-2 w-6 h-6 iconTrue' /> : <XIcon className='ml-2 w-6 h-6 iconNone' />}</p>


                            </div>

                            <div>

                                <div className="grid grid-cols-2 p-2">




                                    <div className="grid grid-cols-2">
                                        <div className=" mr-5">
                                            {!isEnable ?
                                                <div className="h-12 w-24 flex justify-center inline-flex rounded-xl items-center  content-center  login text-sm hover:cursor-pointer"
                                                    onClick={() => {
                                                        var tot = +document.getElementById("myNumberInput").value + 0


                                                        if (isNaN(tot)) {
                                                            tot = 1
                                                            dispatch(setQuantity([product, +tot + 0]))
                                                        }
                                                        if (tot === 0) {
                                                            tot = 1
                                                            dispatch(setQuantity([product, +tot + 0]))

                                                        }

                                                        if (+tot + 1 !== 0) {

                                                            if (tot < stock)
                                                                tot = + document.getElementById("myNumberInput").value + 1

                                                            dispatch(setQuantity([product, +tot]))
                                                        }

                                                        toggleAddressForm()
                                                        setModalQty(+tot)
                                                        document.getElementById("myNumberInput").value = +tot

                                                    }
                                                    }>
                                                    +1 <ShoppingCartIcon className="w-8 h-8" />

                                                </div> : <div className="col-start-3 col-span-1 ">

                                                    {errorQty === "" && isEnable ? <div className="h-12 w-24 flex justify-center  inline-flex rounded-xl items-center  content-center  login text-sm hover:cursor-pointer" onClick={() => {
                                                        var tot = document.getElementById("myNumberInput").value

                                                        if (isNaN(tot)) {


                                                        } else {
                                                            if (+tot !== 0) { dispatch(setQuantity([product, +tot])) }
                                                            else { dispatch(remove(product)) }
                                                            toggleAddressForm()
                                                            setModalQty(tot)
                                                            toggle(event.currentTarget)
                                                        }
                                                    }
                                                    }>
                                                        Ajouter <ShoppingCartIcon className="w-8 h-8" />
                                                    </div> : errorQty
                                                    }
                                                </div>
                                            }
                                        </div>


                                        <div className="ml-8 grid  grid-cols-2">

                                            <div>
                                                <input type="number"
                                                    disabled={!isEnable}
                                                    step={1}
                                                    id="myNumberInput"
                                                    min={0} max={stock}
                                                    defaultValue={cart !== null ? cartQuantity : 0}
                                                    className="w-14 mr-1 md:w-20"
                                                    onInput={(event) => {
                                                        handleChange(event.target)
                                                    }}

                                                /></div>

                                            <div className="pl-4 ml-8">


                                                <button
                                                    onClick={(event) => toggle(event.currentTarget)}
                                                    type='button'
                                                    className={!isEnable ? styleShowBtn : styleHideBtn}  >
                                                    <PencilIcon className="h-6 w-6" />
                                                </button>
                                                <button type='button'
                                                    onClick={cancelHandler}
                                                    className={isEnable ? styleShowBtn : styleHideBtn}  >

                                                    <XCircleIcon className="h-6 w-6" />
                                                </button>
                                            </div>
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
                        qty={modalQty}
                    >
                    </ModalAddToCart>
                </div>

                <h1 className="font-bold text-xl mt-10 ml-3">   Produits liés à cet article</h1>

                <div className="flex justify-around mb-10">

                    <div className=" flex flex-wrap   md:grid grid-cols-6 justify-between w-full  lg:w-full  ">

                        {
                            productRelated.map((element, index) => {
                                if (index < 6) return <ProductRelated product={element} key={index} />;
                            }



                            )}

                    </div></div>
            </div>
        </>
    );
};

export default ProductDetails;