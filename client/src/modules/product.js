import { getProducts, setProducts } from "@/api/product";
export const product={
    state:{
        products:[]
    },
    mutations:{
        GET_PRODUCTS(state,products){
            state.products=products;
        },
        SET_PRODUCTS(state,payload){
            state.products=state.products.map(p=>p.id==payload.id?payload:p)
        }
    },
    actions:{
    async getProducts({commit}){
        const res=await getProducts();
        commit('GET_PRODUCTS',res);
    },
    async setProducts({commit},newProduct){
        const res=await setProducts(newProduct);
        commit('SET_PRODUCTS',res);
    }
    }
}