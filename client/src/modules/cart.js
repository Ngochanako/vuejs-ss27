import { addProductToCarts, getCarts, removeProductFromCarts, updateCarts } from "@/api/cart"

export const cart={
    state:{
        carts:[]
    },
    mutations:{
        GET_CARTS(state,payload){
            state.carts=payload
        },
        ADD_CARTS(state,payload){
            state.carts.push(payload)
        },
        DELETE_CARTS(state,payload){
            state.carts=state.carts.filter(cart=>cart.id!==payload)
        },
        UPDATE_CARTS(state,payload){
            state.carts=state.carts.map(cart=>cart.id===payload.id?payload:cart)
        }
    },
    actions:{
        async getCarts({commit}){
            const response=await getCarts();
            commit('GET_CARTS',response)
        },
        async addNewCarts({commit},newCart){
            const response=await addProductToCarts(newCart);
            commit('ADD_CARTS',response)
        },
        async deleteCarts({commit},id){
            const response=await removeProductFromCarts(id);
            commit('DELETE_CARTS',response)
        },
        async updateCarts({commit},newCart){
            const response=await updateCarts(newCart);
            commit('UPDATE_CARTS',response)
        }
    }
}