import { setToken } from '../services/tokenServices';
import { createSlice } from '@reduxjs/toolkit';

/**
 * initial state: is logged check if the user is already authenticated when openning the Application
 * @author Luca Toscana
 */



var reduxAddress = {

    number: '',
    street: '',
    additionalAddress: '',
    postalCode: '',
    city: '',
    country: '',
    isMain: false}


var address = () => {
    if (localStorage.getItem('myAddress') !== null) { reduxAddress = JSON.parse(localStorage.getItem('myAddress')) }
    return reduxAddress
}




export const livraisonSlice = createSlice({
    name: 'livraison',
    initialState: address(),
    reducers: {
        setLivraison: (state, { payload }) => {
            state.value = payload
            localStorage.setItem("myAddress", JSON.stringify(state.value))
        }
    }
})

export const { setLivraison } = livraisonSlice.actions

export const selectLivraison = (state) => state.livraison

export default livraisonSlice.reducer