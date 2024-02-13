import {  FastForwardIcon } from "@heroicons/react/solid";
import React from "react";
import { useHistory } from "react-router-dom";
import { URL_PAIEMENT_2 } from "../../constants/urls/urlConstants";


export function ButtonToPayer() {
  const history = useHistory();

  const test = () => {
    if (localStorage.getItem("myAddress") !== null) {
      const address = JSON.parse(localStorage.getItem("myAddress"))
      if ((address.number === null) ||
        address.street === null ||
        address.postalCode === null ||
        address.city === null ||
        address.country === null ||
        address.isMain === null) {
        return false
      } else {
        return true
      }
    }
  }


  return (

    <div className="flex justify-end" onClick={() => { if (test()) { history.push(URL_PAIEMENT_2) } }} >
      <div className="flex items-center">
      <button  onClick={() => { if (test()) { history.push(URL_PAIEMENT_2) } }}> <p  className={test() === true ? "text-center font-bold text-green-600 text-3xl uppercase" : "text-center text-2xl"}>
          {test() ? "Continuer l'achat" : "Entrer une adresse de livraison"}</p></button> </div>
      <div className="ml-8"> <button> <FastForwardIcon className={test() ? 'h-24 w-24 iconTrue  ' : 'h-16 w-16'}
        /></button></div>
    </div>
  );
}

