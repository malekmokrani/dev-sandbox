import {  TrashIcon, XIcon } from "@heroicons/react/solid";
import React from "react";
import ReactDOM from "react-dom";
import visa from '../../../../../assets/images/visa.png'
import mastercard from '../../../../../assets/images/mastercard.png'




const ModalDeletCard = ({ isShowing, hide, submit, brand, expiryDate,last4,confirm }) =>
  isShowing
    ? ReactDOM.createPortal(
      <>
        <div className="modal-overlay ">
          <div className="modal-wrapper">
            <div className="modal p-5">
              <div className="modal-header"> <p className="font-extrabold text-2xl text-center w-full	">Confirmez-vous la suppression du mode de paiement suivant ?</p>

                <button
                  type="button"
                  className="modal-close-button"
                  onClick={hide}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body items-center justify-center text-center mt-5">

                <div className="flex items-center space-x-5 m-5 p-2  border-2 border-red-700 mb-10 mt-10 ">
                  <div className="flex-shrink-0">
                    {brand === 'Visa' ? <img className=' w-12' src={visa} /> : <img className='w-12' src={mastercard} />}                           </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      ---- ---- ----  {last4}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    expiry date:  {expiryDate}                 </p>
                  </div>
                 
                </div>
                <div className="grid grid-cols-2  mt-5"> <div>  <button type="button"
                  onClick={confirm} className="deletCards "> <div className="grid grid-cols-5"><p className="text-xl col-span-4 mt-1">RETIRER </p> <TrashIcon className="w-6 m-1"></TrashIcon></div></button>  </div>    <div> <button type="button"
                    onClick={hide} className="validateCart  bg-red-500"><div className="grid grid-cols-5"><p className="text-xl col-span-4 mt-1">ANNULLER </p> <XIcon className="w-6 m-1"></XIcon></div></button></div> </div>


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

export default ModalDeletCard;