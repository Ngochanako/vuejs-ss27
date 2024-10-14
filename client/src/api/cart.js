import axios from "axios"

export const getCarts=async()=>{
    const response=await axios.get('http://localhost:3000/carts')
    return response.data
}
export const addProductToCarts=async(product)=>{
    const response=await axios.post('http://localhost:3000/carts',product)
    return response.data
}
export const removeProductFromCarts=async(idCart)=>{
    const response=await axios.delete(`http://localhost:3000/carts/${idCart}`)
    return idCart;
}
export const updateCarts=async(cart)=>{
    
    const response=await axios.put(`http://localhost:3000/carts/${cart.id}`,cart)
    return response.data;
}