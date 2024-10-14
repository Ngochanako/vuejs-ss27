import axios from "axios"

export const getProducts=async()=>{
    const response=await axios.get(' http://localhost:3000/products');
    return response.data;
}
export const setProducts=async(product)=>{
    const response=await axios.put(`http://localhost:3000/products/${product.id}`,product);
    
    return response.data;
}