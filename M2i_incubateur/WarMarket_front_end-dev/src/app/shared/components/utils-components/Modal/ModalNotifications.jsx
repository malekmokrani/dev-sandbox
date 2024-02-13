import { TrashIcon } from "@heroicons/react/solid";
import React from "react";
import ReactDOM from "react-dom";
import { deleteNotificationByDate } from "../../../../api/backend/user";
import logo from "../../../../assets/images/icones/logo/warhammer-shop-logo.png";
import war from '../../../../assets/images/war1.png'
  
const ModalNotifications = ({ isShowing, hide, notifications, deleteOne, pushHistory }) =>
  isShowing

    ? ReactDOM.createPortal(
      <>
        <div className="modal-overlay  "  >
          <div className="modal-wrapper "    >
            <div className="modal  lg:x-1/2 " style={{
              backgroundImage: `url(${war})`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}>
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

                  <div className="  p-4 w-full  h-96 overflow-x-auto  bg-white rounded-lg border shadow-md sm:p-2 mb-5">

                    <div className="  overflow-x-auto  ">
                      <ul role="list" className="divide-y divide-gray-200  ">

                        {notifications !== null ? notifications.slice(0).reverse().map((element, index) => <>  <li class="py-3 sm:py-4">
                          <div className="flex items-center space-x-8">
                            <div className="flex-1 min-w-0" >
                              <p className="text-xs text-gray-900  w-24  lg:w-full " >
                                <button onClick={() => {                                   deleteOne(index,element.date)

                                   pushHistory(element.message,element.idorder) 
                                  
                                  }

                                }> {element.message}  <div className="mt-3"> {element.idorder!==0?"   Order : "+element.idorder:null}</div></button>
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {element.date}                    </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              <button onClick={() => {
                                deleteOne( index,element.date)
                              }}>  <TrashIcon className='w-8 h-8'    ></TrashIcon>     </button>        </div>
                          </div>
                        </li></>) : null}

                      </ul>
                    </div>
                  </div>

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
              border-radius: 5px;
              padding: 1rem;
              

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

export default ModalNotifications;