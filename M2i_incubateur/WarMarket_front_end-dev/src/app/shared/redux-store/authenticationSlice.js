import { setToken } from './../../shared/services/tokenServices';
import { isAuthenticated , isAdmin, isComm } from '../../shared/services/accountServices';
import { createSlice } from '@reduxjs/toolkit';

/**
 * initial state: is logged check if the user is already authenticated when openning the Application
 * @author Peter Mollet
 */
 const initialState = { 
    isLogged : isAuthenticated() ,
    isAdmin : isAdmin(),
    isComm : isComm()
}

export const authenticationSlice = createSlice({
    name: 'AUTHORITIES_KEY',
    initialState,
    reducers: {
        signIn: (state, action) => {
            setToken(action.payload);
            state.isLogged = true;
            state.isAdmin = isAdmin();
            state.isComm = isComm();
        },
        signOut: (state) => {
            localStorage.setItem("token","");
            sessionStorage.clear();
            state.isLogged = false;
            state.isAdmin = false;
            state.isComm = false;
        }
    }
})

export const { signIn, signOut } = authenticationSlice.actions;

export const selectIsLogged = (state) => state.auth.isLogged;

export const selectIsLoggedAdmin = (state) => state.auth.isAdmin;
export const selectIsLoggedComm = (state) => state.auth.isComm;

export default authenticationSlice.reducer