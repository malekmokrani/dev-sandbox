import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart"))??[]
}
export const cartSlice = createSlice({
    name: 'carts',
    initialState,
    reducers:{
        add(state, {payload}){
            if(state.cart.findIndex(c => c.id === payload.id)<0 && state.cart.stock !== 0){
                state.cart.push(payload)
            }else if(payload.stock>payload.quantite){
                state.cart[state.cart.findIndex(c => c.id === payload.id)].quantite+=1
            }
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },

        remove(state, {payload}){
            let pos = state.cart.findIndex((p)=>p.id===payload.id);
            state.cart.splice(pos,1)
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        init(state){
            state.cart = []
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        setQuantity(state, {payload} ){
            if(payload[1]===""){payload[1]=0}
            if(payload[1]<=payload[0].stock){
                if(  state.cart[state.cart.findIndex(c => c.id === payload[0].id)]!==undefined){
                state.cart[state.cart.findIndex(c => c.id === payload[0].id)].quantite=payload[1]
            }else{

                state.cart.push(payload[0])

            }


                localStorage.setItem("cart",JSON.stringify(state.cart))
            }
        },
    }
})

export const {add, remove, init, setQuantity} = cartSlice.actions
export const selectCart = (state) => state.carts.cart
export default cartSlice.reducer