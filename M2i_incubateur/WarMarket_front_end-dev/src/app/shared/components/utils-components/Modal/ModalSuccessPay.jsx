import { BadgeCheckIcon, CheckIcon } from "@heroicons/react/solid";
import React from "react";
import ReactDOM from "react-dom";
import logo from "../../../../assets/images/icones/logo/warhammer-shop-logo.png";
import war from '../../../../assets/images/war1.png'





const ModalSuccessPay = ({ isShowing, hide }) =>
  isShowing
    ? ReactDOM.createPortal(
      <>
        <div className="modal-overlay"style={{
                backgroundImage: `url(${war})`,
                backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
                backgroundSize: 'cover',
        }}>
          <div className="modal-wrapper">
            <div className="modal">
              <div className="modal-header"> <p className="font-extrabold text-2xl text-center	">Paiement effectué avec succès !</p>

                <button
                  type="button"
                  className="modal-close-button"
                  onClick={hide}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body items-center justify-center text-center">
          <div className="self-center">    <BadgeCheckIcon className='md:w-full h-full iconTrue' /></div>
              {/*  <div className="grid grid-cols-2 gap-2"> <div > <BadgeCheckIcon className='md:w-48 h-48 iconTrue' /> </div><div className="self-center p-3">
                 <img src={logo}></img>
                  
                  
                   </div></div>*/}
                <div><p className="font-extrabold text-2xl text-center	"> Tot paye:  {"  " +   localStorage.getItem("totPayer")
                }€</p></div>

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
              background-color: rgba(0, 0, 0, 0.5);
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
              background: #fff;
              position: relative;
              margin: auto;
              border-radius: 5px;
              max-width: 500px;
              width: 1500%;
              padding: 1rem;
            }

            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .modal-close-button {
              font-size: 1.4rem;
              font-weight: 700;
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

export default ModalSuccessPay;