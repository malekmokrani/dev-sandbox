import React, { useEffect } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import useModal from "../utils-components/Modal/useModal";
import ModalSuccessPay from "../utils-components/Modal/ModalSuccessPay";
import logo from "./../../../assets/images/icones/logo/warhammer-shop-logo.png";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { init, selectCart } from '../../../shared/redux-store/cartSlice'
import { useSelector } from "react-redux";
import { accountLogin, isAuthenticated } from '../../../shared/services/accountServices';
import { URL_LOGIN } from "../../constants/urls/urlConstants";
import {addOrderWithAddress } from "../../../api/backend/order";




function ButtonStripe(props) {


    const apiKey = import.meta.env.VITE_REACT_STRIPE_API_KEY

    const am = props.amountO
    const carts = useSelector(selectCart)
    const idaddress = localStorage.getItem("idAddress",)

    const history = useHistory()
    const dispatch = useDispatch();

    useEffect(() => {
        if (performance.navigation.type === 1) {

            var test = localStorage.getItem("successPaiement")
            if (test === "true") {
                localStorage.removeItem('totPayer')
                dispatch(init())
                localStorage.removeItem('myAddress')
                localStorage.removeItem('idAddress')
                localStorage.removeItem('totPayer')

                history.push("/")
            }

            console.log("This page is reloaded");
        } else {
            console.log("This page is not reloaded");
        }
    });

    const validate = (carts) => {

        if (isAuthenticated()) {
            const addressLocalStorage = JSON.parse(localStorage.getItem("myAddress"))
            const isMain = addressLocalStorage.isMain;

            const address = {

                id: idaddress,
                number: addressLocalStorage.number,
                street: addressLocalStorage.street,
                additionalAddress: addressLocalStorage.additionalAddress,
                postalCode: addressLocalStorage.postalCode,
                city: addressLocalStorage.city,
                country: addressLocalStorage.country,

            }

            addOrderWithAddress(carts.filter(c => !(c.quantite === "")), address, "domicile", isMain).then(res => {
                if (res.data) {

                    localStorage.setItem("successPaiement", true)

                }
            }
            )
        } else {
            history.push(URL_LOGIN)
        }
    }

    const hideSuccess = () => {

        history.push('/')
        dispatch(init())
        toggleSuccessForm()
        localStorage.removeItem('myAddress')
        localStorage.removeItem('idAddress')

        localStorage.removeItem('totPayer')



    }

    const { isShowing: isAddressFormShowed, toggle: toggleSuccessForm } = useModal();


    const deleteAndRefresh = () => {
        dispatch(init())
        localStorage.removeItem('totPayer')

        history.push('/')


    }
    const x = () => setTimeout(function () { deleteAndRefresh() }, 5000);

    async function handleToken(token) {
        console.log(token);
        await axios.post("http://localhost:8080/api/payment/charge", "", {
            headers: {
                token: token.id,
                amount: props.amountO,

            },
        })
            .then(() => {

                localStorage.setItem('totPayer', props.amountO)
                validate(carts)

                toggleSuccessForm()

                x()

            })
            .catch((error) => {
                alert(error);
            });
    }

    return (
        <div className="ButtonStripe">
            <StripeCheckout
                stripeKey={apiKey}
                token={handleToken}
                description="Warhammer Market"
                image={logo}
                email={accountLogin()}
            
                >
                <button className="validateCart mt-2" disabled={am < 11 ? true : false}>One-Click {props.amountO} €</button>


            </StripeCheckout>
            <ModalSuccessPay
                isShowing={isAddressFormShowed}
                hide={hideSuccess}
                title="SUCCESS"
            >
            </ModalSuccessPay>

        </div>
    );
}

export default ButtonStripe;
