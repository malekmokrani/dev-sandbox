import React from "react";
import ReactDOM from "react-dom";

const ModalAddToCart = ({ isShowing, hide,cart ,qty}) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="modal-header ">
                  <h4>Panier Modifie!</h4>
                  <button
                    type="button"
                    className="modal-close-button"
                    onClick={hide}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                
                
                
                <div  className="flex cartCard mt-4 p-4 w-full">
                        <div className="pr-5">
                            <img src={cart.picture} alt="" className="w-40"
                                />
                        </div>
                        <div className="w-full flex flex-col place-content-evenly">
                            <h2 className="font-semibold">{cart.label}</h2>
                            <div className="flex items-center pb-2">
                                <div className='w-1/2'>
                                    <p className="font-bold">{cart.price} € H.T.</p>

                                </div>
                                <div>
                                <p className="font-bold">Quantite: {qty}</p>
                                    
                                </div>

                            </div>
                            <p className="font-bold">{(cart.price*1.2).toFixed(2)} € T.T.C. *{qty} =  {(cart.price*1.2*qty).toFixed(2)} €</p>

                        </div>

                    </div>
                
                
                
                
                
                
                
                
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
              width: 80%;
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

export default ModalAddToCart;