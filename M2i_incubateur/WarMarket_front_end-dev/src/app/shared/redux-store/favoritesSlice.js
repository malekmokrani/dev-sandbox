

    import { createSlice } from "@reduxjs/toolkit";
    import { createAsyncThunk } from '@reduxjs/toolkit'
    import { getFavorites } from "../../api/backend/user";


/**
 *  Asynchrone call, Load user favorites Liste 
 *  populate state.favorites
 * @return {Array} 
 *   @author Malek MOKRANI
 */
 export const fetchFav = createAsyncThunk("/user/getFavorites" , async()=>{
            const res = await  getFavorites();
    return  res.data;
});

    const initialState = {
        status:'idle',  //'idle' | 'loading' | 'succeeded' | 'failed',
        pageable:null,
        favorites:[],
        error:null,
        dataLoaded:false,
        isAuthenticated:false
    }

    export const FavoritesSlice = createSlice({
            name:'fav',
            initialState,
        reducers:{
            clearFavData : (state, actions)=>
            {
                state.favorites= [];
                state.status='idle';
            }
        },
        extraReducers: builder => {
            builder.addCase(fetchFav.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchFav.fulfilled, (state, action) => {
  
                state.status = 'succeeded';
                state.dataLoaded = true;
                state.favorites = action.payload;
            })
            .addCase(fetchFav.rejected, (state , action)=>{
                state.status = 'failed';
                state.error = action.error.message
            })
        }
    });



export  const selectorFav = (state) => state.fav.favorites;
export  const selectorFavState = (state) => state.fav.status;
export const { clearFavData } = FavoritesSlice.actions;
export default FavoritesSlice.reducer
