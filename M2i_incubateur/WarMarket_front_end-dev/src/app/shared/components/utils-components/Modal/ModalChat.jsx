import { ChatAlt2Icon, HeartIcon, ReplyIcon } from "@heroicons/react/solid";
import React from "react";
import ReactDOM from "react-dom";
import logo from "../../../../assets/images/icones/logo/warhammer-shop-logo.png";
import war from '../../../../assets/images/war1.png'
import { ROLE_SALESMAN } from "../../../constants/rolesConstant";
import { hasRole } from "../../../services/accountServices";

const ModalChat = ({ isShowing, hide, userData, handleMessage, sendPrivateValue,
  publicChats, customers, setChat, client, messagesEndRef,privateChats }) =>
  isShowing

    ? ReactDOM.createPortal(
      <>
        <div className={isShowing ? "p-3 rounded-lg  modal-wrapper  flex-row-reverse pointer-events-none    bottom-0 mt-10 pb-3 rounded-lg animated fadeIn faster  " : " modal-wrapper  flex-row-reverse pointer-events-none   bottom-0 mt-10 pb-3  overflow-hidden animated fadeOut faster rounded-lg  "}>
          <div className="lg:w-3/7 p-3  rounded-lg m-3 pointer-events-auto overflow-x-auto lg:overflow-hidden h-full" style={{
            backgroundImage: `url(${war})`,
            backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}>
            <div className="flex justify-between pointer-events-auto w-full h-24 z-50 ">
              <div className="flex  items-center justify-center text-center m-3">
                <img src={logo} className="h-24"></img>
              </div> <button
                type="button"
                onClick={hide}
              >
                <span className=" text-8xl text-white">&times;</span>

              </button></div>
            <div className={"lg:flex  items-center justify-center text-center md:grid grid-cols-1 "}>
              <div class="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg  m-3 lg:mr-2 lg:h-96">
                <div >
                  {hasRole(ROLE_SALESMAN) ?
                    <div className={"w-full p-4 overflow-x-auto h-48 lg:h-96"}>
                      <p>CLIENTS</p>
                      {customers.map((element) =>
                        <div className={element === client ? "flex items-center justify-start bg-white p-2 rounded bg-yellow-300" : "flex items-center justify-start bg-white p-2 rounded "}>
                          <ChatAlt2Icon className="w-8"></ChatAlt2Icon>
                          <p>   <div  >   <button value={element} onClick={setChat(element)} > {element}
                          </button>
                          </div></p>
                        </div>)}


                    </div>

                    : null}
                </div></div>


              {<div className="self-center ">

                <div className=" bg-white rounded-lg border shadow-md sm:p-2 mb-5 overflow-x-auto  mt-5 h-96">

                  <div className="h-48 w-full md:w-96 lg:w-96 lg:h-full">
                    <div className="w-full">
                      {userData.connected ?
                        <div className=" lg:h-48">
                          <div className="lg:h-48">
                            <div className="">
                              <ul className="">
                                {privateChats.map((chat, index) => (
                                  <>{chat.chat === client ?
                                    <div>{//<p>{chat.date.slice(0, 10)}</p> 
                                    
                                    }
                                    <li className={chat.senderName === userData.username ? 'flex justify-end m-1  rounded-lg   ' : 'flex justify-start m-1  rounded-lg  '} key={index}>
                                 
                                    
                                      <div className={chat.senderName === userData.username ? ' bg-blue-100  rounded-lg lg:w-2/3 flex justify-end  text-ellipsis overflow-hidden' 
                                      : ' bg-yellow-100 rounded-lg lg:w-2/3 flex justify-start  text-ellipsis overflow-hidden'} >
                                        <div>
                                          {chat.senderName !== userData.username && <div className={chat.senderName === userData.username ? 'flex justify-end  m-1' : 'flex justify-start m-1 '}>
                                            <p className="text-xs">{!hasRole(ROLE_SALESMAN)
                                           && chat.senderName !== userData.username ? "WARHAMMERMARKET" : 
                                          <>{chat.senderName !== chat.chat ? <p className="bg-blue-700 rounded-lg p-1 text-white">
                                            <div>WARHAMMERMARKET</div>{chat.senderName}</p> : <p>{chat.senderName}</p>}</>}</p></div>}

                                          <div className=" "><p className={chat.senderName === userData.username ? 'flex justify-end  m-1 text-md  '
                                           : 'flex justify-start m-1 text-md  '} key={index}>{chat.message}</p></div>
                                          {
                                            <div className="">
                                              <p className={chat.senderName === userData.username ? 'flex justify-end mr-5 m-1 text-xs   '
                                               : 'flex justify-start m-1 ml-5 text-xs'}>{chat.date !== null ? chat.date.slice(11, 16) : null}
                                               <p className="ml-2">{chat.date.slice(0, 10)}</p> </p></div>}
                                               </div></div>
                                    </li></div> 
                                    : null
                                  }  </>))}
                                <div className="mb-1 h-4" ref={messagesEndRef} />

                              </ul>


                            </div>

                          </div></div>
                        :

                        null}
                    </div>
                  </div>
                </div>

              </div>}

            </div>
            <div className="flex  justify-end mb-2 ">
              <div className="mb-1 grid grid-cols-5 w-full ">
                <div className="col-span-4">
                  <p> <input type="text" className="input-message rounded w-full" placeholder="enter the message"
                    value={userData.message} onChange={handleMessage} /></p>
                </div>
                <div className="col-span-1 flex justify-center item-center">
                  <button type="submit" class=" bg-yellow-400 text-white  text-bold hover:bg-yellow-600 p-2 rounded text-sm w-auto"
                    onClick={
                      sendPrivateValue}>

                    <ReplyIcon className="h-5 w-12"></ReplyIcon></button>
                </div>
              </div>
            </div>
          </div>
        </div>




        <style jsx="true">{`
        
            .animated {
              -webkit-animation-duration: 1s;
              animation-duration: 1s;
              -webkit-animation-fill-mode: both;
              animation-fill-mode: both;
            }
        
            .animated.faster {
              -webkit-animation-duration: 1000ms;
              animation-duration: 1000ms;
            }
        
            .fadeIn {
              -webkit-animation-name: fadeIn;
              animation-name: fadeIn;
            }
        
            .fadeOut {
              -webkit-animation-name: fadeOut;
              animation-name: fadeOut;
            }
        
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
        
              to {
                opacity: 1;
              }
            }
        
            @keyframes fadeOut {
              from {
                opacity: 1;
              }
        
              to {
                opacity: 0;
              }
              
              .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: 1040;
                background-color: rgba(0, 0, 0, 1);
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

export default ModalChat;