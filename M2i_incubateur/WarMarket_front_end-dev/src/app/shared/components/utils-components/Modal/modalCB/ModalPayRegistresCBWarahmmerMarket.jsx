import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import ReactDOM from "react-dom";
import logo from "../../../../../assets/images/icones/logo/warhammer-shop-logo.png";

import StripeInput from "../../../stripeInput/StripeInput";
import war from '../../../../../assets/images/war1.png'
import CardCreditLinesOrder from "../../../stripeInput/CardCreditLinesOrder";

const ModalPayRegistresCBWarahmmerMarket = ({ isShowing, hide, toggle, cards, tot ,submit,disabled}) =>
  isShowing
    ? ReactDOM.createPortal(
      <>
        <div className="modal-overlay"  >
          <div className="modal-wrapper w-full"  style={{
              backgroundImage: `url(${war})`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}  >
            <div className="modal w-full ">
              <div className="flex justify-end"> <button
                type="button"
                className="modal-close-button"
                onClick={hide}
              >
                <span className=" text-8xl text-white">&times;</span>

              </button></div>
              <div className="flex  items-center justify-center text-center mb-3"> <img src={logo} className="h-24"></img>
              </div>
              <div className="flex  items-center justify-center text-center">

                {<div className="self-center ">
                  <CardCreditLinesOrder cards={cards} size={cards.length} isFormShowed={isShowing} toggle={toggle}  tot={tot} submit={submit} disabled={disabled} ></CardCreditLinesOrder>



                </div>}
              </div>
            </div>
          </div>
        </div>


        <style jsx="true">{`
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              z-index: 1040;
              background-color: rgba(0, 0, 5, 0.2);
            }

            .modal-wrapper {
              position: fixed;
              top: 0;
              left: 0;
              z-index: 1050;
              width: 100%;
              height: 100%;
              overflow-x: hidden;
              overflow-y: auto;
              outline: 0;
              display: flex;
              align-items: center;

            }

            .modal {
              z-index: 100;
              position: relative;
              margin: auto;
              border-radius: 5px;
              max-width: 150%;
              width: 80%;
              padding: 1rem;
              background-color: rgba(350, 350, 350, 0);

            }

            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .modal-close-button {
              
              font-size: 2.4rem;
              font-weight: 100;
              color: #000;
              cursor: pointer;
              border: none;
              background: transparent;
            }
          `}</style>
      </>,
      document.body
    )
    : null;

export default ModalPayRegistresCBWarahmmerMarket;