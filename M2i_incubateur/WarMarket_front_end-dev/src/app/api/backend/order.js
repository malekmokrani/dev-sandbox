import apiBackEnd from "./api.BackendWithToken";
import {URL_BACK_ADD_ORDER, URL_BACK_GET_ALL_ORDERS, URL_BACK_GET_ORDERS, URL_BACK_GET_ORDER_DETAILS, URL_BACK_UPDATE_STATUS_ORDER, URL_CUSTOMER_CARDS, URL_DELETE_CARD, URL_NEW_CUSTOMER, URL_NEW_CUSTOMER_AND_PAY, URL_PAY_ONE_TIMES, URL_PAY_ORDER, URL_PAY_REGISTRED_CARD} from "../../shared/constants/urls/urlBackEnd";
import axios from "axios";

export function addOrder(list){
    return apiBackEnd.post(URL_BACK_ADD_ORDER,list)
}

export function addOrderWithAddress(list,address,type,isMain){

    const order = {
        productsOrder:list,
        address:address,
        type:type,
        isMain:isMain
    }
    return apiBackEnd.post(URL_BACK_ADD_ORDER,order)
}

export const getOrders = () => {
    return apiBackEnd.get(URL_BACK_GET_ORDERS)
}

export const getAllOrders = () => {
    return apiBackEnd.get(URL_BACK_GET_ALL_ORDERS)
}
export const getOrdersDetails = (id) => {
    return apiBackEnd.get(URL_BACK_GET_ORDERS + `/${id}`)
}

export const getOrderDetailsWithListProduct = (id) => {
    return apiBackEnd.get(URL_BACK_GET_ORDER_DETAILS + `${id}`)
}



export const updateStatusOrderById=(value)=>{
    return apiBackEnd.put(URL_BACK_UPDATE_STATUS_ORDER ,value)

}
/*credit-card*/ 
export const payOneTimes=(values)=>{
    return apiBackEnd.post(URL_PAY_ONE_TIMES,values)
}
export const newCustomerAndPay=(values)=>{
    return apiBackEnd.post(URL_NEW_CUSTOMER_AND_PAY,values)
}

export const newCustomer=(values)=>{
    return apiBackEnd.post(URL_NEW_CUSTOMER,values)
}


export const allCustomerCards=()=>{
    return apiBackEnd.get(URL_CUSTOMER_CARDS)
}

export const deleteCard=(value)=>{
    const card = {cardStripe:value}
    return apiBackEnd.post(URL_DELETE_CARD ,card)
}

export const payWithRegistredCard=(values,amount)=>{
    const card = {cardStripe:values,amountOrder:amount }


    return apiBackEnd.post(URL_PAY_REGISTRED_CARD,card)
}