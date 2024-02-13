import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authenticationSlice'
import cartsReducer from './cartSlice'
import livraisonReducer from './livraisonSlice'
import filterProductReducer from './filterProductSlice';
import userInfo from './userProfileSlice'
import favoriteReducer  from './favoritesSlice';
import webSocketReducer  from './webSocketSlice';

/**
 * To configure the store redux. 
 * 
 * @author Peter Mollet
 */
 export const store = configureStore({
	reducer: {
		auth		: authenticationReducer,
		carts		: cartsReducer,
		livraison	: livraisonReducer,
		filterProducts:filterProductReducer,
		userInfo	: userInfo,
		fav 		: favoriteReducer,
		webSocket:webSocketReducer
	}
});
