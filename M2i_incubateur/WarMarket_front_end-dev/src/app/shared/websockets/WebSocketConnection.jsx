import React, { useEffect, useRef, useState } from 'react'
import { over } from 'stompjs';
import { accountLogin, hasRole, isAuthenticated } from '../services/accountServices';
import { getToken } from '../services/tokenServices';
import { useDispatch, useSelector } from 'react-redux';
import { isOnline, isOpenChat, isOpenChatStore, onPrivateListMessageStore, onPrivateMessageStore, onPrivateNotificationStore, selectChatClient, selectCustomers, selectPrivateChats, setOnlineFalse, setOnlineTrue } from '../redux-store/webSocketSlice';
import useModal from '../components/utils-components/Modal/useModal';
import { allChats, sendAllNotificationByUser } from '../../api/backend/user';
import { ChatIcon } from '@heroicons/react/solid';
import ModalChat from '../components/utils-components/Modal/ModalChat.jsx'
import { ROLE_SALESMAN } from '../constants/rolesConstant';

var Sock = new WebSocket("ws://localhost:8080/ws");
var stompClient = over(Sock);


const token = () => { if (isAuthenticated() === true) { return getToken() } else { return 'null' } }
const login = () => { if (isAuthenticated() === true) { return accountLogin() } else { return 'null' } }





const WebSocketConnection = (props) => {
  const customers = useSelector(selectCustomers)
  const chats = useSelector(selectPrivateChats)
  const openChat = useSelector(isOpenChat)
  const chatClient = useSelector(selectChatClient)
  const online =useSelector(isOnline)
  const { isShowing: isShowed, toggle: toggle } = useModal();
  const dispatch = useDispatch()
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [client, setClient] = useState("");
  const [disabled, setDisabled] = useState(true)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  const [userData, setUserData] = useState({
    username: login(),
    receivername: '',
    connected: false,
    message: '',
    chat: chatClient

  });


  useEffect(() => {

    if (isAuthenticated() === true && userData.connected === false) {
      if (hasRole(ROLE_SALESMAN) === false) {
        setClient(login())
      }

      connect()

    }

    console.log(userData);
  }, [userData, openChat]);




  const connect = () => {
    setDisabled(true)

    var Sock = new WebSocket("ws://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({ 'token': token() }, onConnected, onError);


    
      console.log("connect WS" + userData);
      allChats().then(res => { 
        dispatch(onPrivateListMessageStore(res.data)) 
        sendAllNotificationByUser()
        setDisabled(false)
        dispatch(setOnlineTrue())

      })
        
  }

  const onConnected = () => {
    setUserData({ ...userData, "connected": true });
    stompClient.subscribe('/chatroom/public', onMessageReceived);//--- chat produit? 
    stompClient.subscribe("/notifications/messages", onMessageReceived);   //--- example: for new  article notify all client
    stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
    stompClient.subscribe('/user/' + userData.username + '/notifications/private-messages', onPrivateNotification);
    userJoin();
  }

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN"
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));

  }



  const onPrivateMessage = (payload) => {
    console.log("new onPrivateMessage")
    var payloadData = JSON.parse(payload.body);
    console.log(payloadData.date)
    publicChats.push(payloadData);
    setPublicChats([...publicChats]);
    dispatch(onPrivateMessageStore(payloadData))
    console.log("dispatch onPrivateMessage end")
    scrollToBottom()
  }



  const onPrivateNotification = (payload) => {
    var payloadData = JSON.parse(payload.body);
    dispatch(onPrivateNotificationStore(payloadData))
  }



  const onError = (err) => {
    console.log(err);

  }


  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, "message": value });
  }


  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE"
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, "message": "" });
    }
  }



  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":

        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        setTimeout(function () {
          scrollToBottom()
        }, 300);
        break;

    }
  }

  const sendPrivateValue = () => {
    if (userData.message !== "" && client !== "") {
      if (stompClient) {
        if (!hasRole(ROLE_SALESMAN)) {
          var chatMessage = {
            senderName: userData.username,
            receiverName: "WARHAMMERMARKET",
            message: userData.message,
            status: "MESSAGE",
            chat: userData.username
          }
        } else {
          var chatMessage = {
            senderName: userData.username,
            receiverName: client,
            message: userData.message,
            status: "MESSAGE",
            chat: client

          }
        }
        stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage))
        setUserData({ ...userData, "message": "" });
        publicChats.push(JSON.stringify(chatMessage));
        setPublicChats([...publicChats]);
      }
    }
  }




  const handleChat = (event) => {

    const { value } = event.target;
    setUserData({ ...userData, "chat": value });
    setUserData({ ...userData, "receivername": value });
    setClient(value)
    setTimeout(function () {
      scrollToBottom()
    }, 300);
  }
  return <div>

    {props.children}


    <footer
      className=" pointer-events-none	
      flex flex-row-reverse bg-transparent
             text-3xl text-yellow-400 text-center
             fixed
             z-50
             inset-x-0
             bottom-0
             p-4 ">

      {(isAuthenticated() === true && userData.connected === true && login() && online ===true) ?

        <button className={disabled === true ? 'pointer-events-none animate-pulse lg:mb-16 z-50' : 'pointer-events-auto lg:mb-16 z-50'}
          onClick={() => {if(isAuthenticated()===true){
            setTimeout(function () {
              dispatch(isOpenChatStore())
              toggle()
            }, 1000);

            setTimeout(function () {
              scrollToBottom()
            }, 1000);

          }else{dispatch(setOnlineFalse())}}}>
          <ChatIcon className='w-20 lg:w-24 md:w-24 '></ChatIcon></button>
        : null}


    </footer>
    <div className='bottom-0'>
      <ModalChat
        userData={userData}
        isShowing={openChat}
        privateChats={chats}
        publicChats={publicChats}
        hide={() => dispatch(isOpenChatStore())}
        message={userData.message}
        handleMessage={handleMessage}
        sendPrivateValue={sendPrivateValue}
        tab={tab}
        sendValue={sendValue}
        customers={customers}
        setChat={() => handleChat}
        client={client}
        messagesEndRef={messagesEndRef}
      >
      </ModalChat></div>  </div>;
}



export default WebSocketConnection  