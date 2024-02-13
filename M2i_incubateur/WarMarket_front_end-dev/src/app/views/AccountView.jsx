import React from "react";
import { useDispatch , useSelector} from "react-redux";
import { signOut , selectIsLoggedAdmin, selectIsLoggedComm} from "../shared/redux-store/authenticationSlice";
import { URL_CART, URL_HOME, URL_PROFILE, URL_ADMIN_HOME , URL_COMM_HOME, URL_PSW_HANDLING, URL_USER_PAY_METOD, URL_WISHLIST} from "../shared/constants/urls/urlConstants";
import boxes from "../assets/images/icones/box.svg";
import userProfile from "../assets/images/icones/user.svg";
import shoppingCart from "../assets/images/icones/cart.svg";
import heart from "../assets/images/icones/heart.svg";
import creditCard from "../assets/images/icones/credit-card.svg";
import key from "../assets/images/icones/key.svg";
import powerButton from "../assets/images/icones/power-button.svg";
import  Dashboard from "../assets/images/icones/dashboard.svg";
import ButtonIcon from "../shared/components/buttons/ButtonIcon";
import ecommerce from "../assets/images/icones/ecommerce.svg";
import { Link, useHistory } from "react-router-dom";
import {init} from '../shared/redux-store/cartSlice';
import { clearUserInformations } from '../shared/redux-store/userProfileSlice';
import {clearFavData} from '../shared/redux-store/favoritesSlice';
/**
 * The user page account with multiple links (cart, user infos, orders...)
 *
 * @returns the AccountView page
 */

const AccountView = () => {

  const displayAdmin = useSelector(selectIsLoggedAdmin);

  const displayComm = useSelector(selectIsLoggedComm);
  
  const navigation = [
    { name: "Commandes", href: `/orders`, image: boxes },
    { name: "Données du compte", href: URL_PROFILE, image: userProfile },
    { name: "Panier", href: URL_CART, image: shoppingCart },
    { name: "Favoris", href: URL_WISHLIST, image: heart },
    { name: "Moyens de paiement", href: URL_USER_PAY_METOD, image: creditCard },
    { name: "Gestion du mot de passe", href: URL_PSW_HANDLING, image: key },
    { name: "Tableau de bord", href: URL_ADMIN_HOME, image: Dashboard },
    { name: "Espace commercial", href: URL_COMM_HOME, image:ecommerce }
    
  ];

  return (
    // Position of the elements below
    <div  className="flex flex-col justify-center items-center m-5">
      {/* The box container characteristics */}
      <div className="box-border p-6 border-4 ">
        {/* Grid system of the box content */}
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
          {/* The different links in the box container */}
          {navigation.map((item) => {
            if(item.name != "Tableau de bord"  || displayAdmin)
              if(item.name != "Espace commercial" || displayComm)
                return <Link key={item.name} to={item.href}>
            {/* Hovering effect */}
            <ButtonIcon item={item} />
          </Link>
          })
            
          }

          <DisconnectionLink />
        </div>
      </div>
    </div>
  );
};

export default AccountView;

const DisconnectionLink = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <button
      key="Déconnexion"
      onClick={() => {
        dispatch(signOut());
        dispatch(clearUserInformations());
        dispatch(init());
        dispatch(clearFavData());
        history.push(URL_HOME);
      }}
    >
      {/* Hovering effect */}
      <ButtonIcon item={{ name: "Se Déconnecter", image: powerButton }} />
    </button>
  );
};
