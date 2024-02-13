import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getProfile } from "../../api/backend/user";
import defaultAvatar from '../../assets/images/default-avatar.png'

const initialState = {
  status    :'idle',  //'idle' | 'loading' | 'succeeded' | 'failed',
  firstName : '',
  lastName  : '',
  birthdate : '',
  mail      : '',
  phone     : '',
  number    : '',
  street    : '',
  city      : '',
  postalCode: '',
  country   : '',
  avatar    : '',
  addressComplement: ''
}
/**
 *  Asynchrone call, Load user profile informations 
 
 * @return {Array} 
 *   @author Malek MOKRANI
 */
export const fetchProfile = createAsyncThunk("/user/getProfile" , 
        async()=>{
            const res = await  getProfile();
          return  res.data;
        });

export const userProfileSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setProfileInfo: (state, actions) => ({ ...state, ...actions.payload }),
    isUpdated : (state, actions)=>
    {
      state.updated= true;
    },
    clearUserInformations:(state, actions)=> ({ ...state, ...initialState }),
    },
    extraReducers: builder => {
      builder.addCase(fetchProfile.pending, (state, action) => {
          state.status = 'loading'
      }).addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        for(let value in action.payload)state[value] = action.payload[value];       
      }).addCase(fetchProfile.rejected, (state , action)=>{
          state.status = 'failed';
          state.error = action.error.message
      })
  }
});

export const { setProfileInfo, isUpdated , clearUserInformations} = userProfileSlice.actions;
export const selectProfileInfo = (state) => state.userInfo;
export  const selectProfileStatus = (state) => state.userInfo.status;

export default userProfileSlice.reducer

export function getuserPicture(img)
{
  if(img=='' || img ==null)return defaultAvatar;
  else return `http://localhost:8080/upload/profilePictures/${img}`;
   
}