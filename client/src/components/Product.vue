<template>
    <v-container grid-list-xs style="display: flex;">
        <div style="padding: 50px;display: flex; flex-direction: column;gap: 20px;width: 50%;">
            <h3>List Product</h3>
            <v-card v-for="(btn,index) in products" :key="index" style="display: flex;align-items: center;padding: 10px;gap: 10px;">
                <img :src="btn.img" alt="" style="width: 100px; height: 100px;border-radius: 5px;">
                <div style="display: flex;flex-direction: column;gap: 5px;">
                    <h4>{{ btn.name }}</h4>
                    <p style="font-size: 12px;">{{ btn.detail }}</p>
                    <h4>Total:{{ btn.quantity }}</h4>
                </div>
                <div style="display: flex;flex-direction: column;gap: 5px;">
                    <v-text-field
                        name="name"
                        id="id"
                        type="number"
                        density="compact"
                        variant="outlined"
                        v-model="btn.newQuantity"
                        min="1"
                        :max="btn.quantity"  
                         @input="validateQuantity(btn)"
                    ></v-text-field>
                    <p>Price:${{ btn.price }}</p>
                    <v-btn color="success" @click="addProduct(btn.id,btn.newQuantity)">Add to cart</v-btn>
                </div>
            </v-card>
        </div>
        <!-- Shopping Cart -->
        <div style="padding: 50px;display: flex; flex-direction: column;gap: 20px;width: 50%;">
            <h3>Shopping Cart</h3>
            <v-card v-for="(btn,index) in cartsDetail" :key="index" style="display: flex;align-items: center;padding: 10px;justify-content: space-around;">
                <img :src="btn.img" alt="" style="width: 100px; height: 100px;border-radius: 5px;">
                <div style="display: flex;flex-direction: column;gap: 5px;">
                    <h4>{{btn.name }}</h4>
                    <v-text-field
                        v-model="btn.quantity"
                        type="number"
                        density="compact"
                        variant="outlined"
                        max-width="70"
                        min="1"
                        :max="btn.stock"
                    ></v-text-field>
                    <h4 style="color: grey;">Quantity:{{ btn.quantity }}</h4>
                </div>
                <div style="display: flex;flex-direction: column;gap: 10px;font-size: 15px;">
                    <h3>${{ btn.price }}</h3>
                    <v-btn @click="updateCart(btn)" size="small" color="red">Update</v-btn>
                    <v-btn @click="deleteCart(btn.idCart,btn.quantity,btn.idProduct)" size="small">Remove</v-btn>
                </div>
            </v-card>
            <v-divider></v-divider>
            <v-row style="justify-content: space-between;padding: 20px 50px;">
               <h3>Subtotals</h3>
               <h3>${{ totalMoney }}</h3>
            </v-row>
        </div>
        <div>
        </div>
    </v-container>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
const store=useStore();
//calculating total money
const totalMoney=computed(()=>{
    return cartsDetail.value.reduce((total, cart)=>{
        return total+cart.price*cart.quantity
    },0)
})
// Fetching products
onMounted(()=>{
    store.dispatch('getProducts')
    store.dispatch('getCarts')
})

const products=computed(()=>store.state.product.products)
const carts=computed(()=>store.state.cart.carts)
const cartsDetail=computed(()=>{
    return carts.value.map(cart=>{
        const product=products.value.find(p=>p.id==cart.productId);
        return {
            idCart:cart.id,
            name:product.name,
            img:product.img,
            price:product.price,
            quantity:cart.quantity,
            stock:product.quantity,
            idProduct:product.id
        }
    })
})
//validate input
const validateQuantity = (btn) => {
  // Kiểm tra giá trị nhập vào, nếu nhỏ hơn min hoặc lớn hơn max thì đặt lại giá trị hợp lệ
  if (btn.newQuantity < 1) {
    btn.newQuantity = 1;
  } else if (btn.newQuantity > btn.quantity) {
    btn.newQuantity = btn.quantity;
  }
};
//add Product to cart

const addProduct=(idProduct,quantity)=>{
    let productFind=products.value.find(p=>p.id==idProduct)
    let newProduct={...productFind,quantity:productFind.quantity-parseInt(quantity) ,newQuantity:1}
    // check if product is available in carts
    let cartFind=carts.value.find(p=>p.productId==idProduct)
    if(cartFind){
        
        let newCart={...cartFind,quantity:parseInt(quantity)+cartFind.quantity}
       
        
        store.dispatch('updateCarts',newCart)        
    }else{
        let newCart={
            id:new Date().getTime(),
            productId:idProduct,
            quantity:+quantity
        }
        store.dispatch('addNewCarts',newCart)
    } 
    store.dispatch('setProducts',newProduct)  
}
// update Cart
const updateCart=(btn)=>{
    let newCart={
        id:btn.idCart,
        productId:btn.idProduct,
        quantity:+btn.quantity
    }
    store.dispatch('updateCarts',newCart)
    // let productFind=products.value.find(p=>p.id==btn.idProduct)
    // let newProduct={...productFind,quantity:productFind.quantity-parseInt( btn.quantity)}
    // store.dispatch('setProducts',newProduct)  
}
//deleteCart
const deleteCart=(cartId,quantity,idProduct)=>{
    store.dispatch('deleteCarts',cartId)
    let productFind=products.value.find(p=>p.id==idProduct);
    let newProduct={...productFind,quantity:productFind.quantity+parseInt(quantity)}
    store.dispatch('setProducts',newProduct)
}


</script>

<style>

</style>