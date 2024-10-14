import { createStore } from "vuex";
import { product } from "./modules/product";
import { student } from "./modules/student";
import { cart } from "./modules/cart";
const store=createStore({
    modules:{
        product:product,
        student:student,
        cart:cart
    }
})
export default store