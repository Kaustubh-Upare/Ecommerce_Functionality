import {  createContext, useEffect, useState } from "react"

export const CartContext = createContext();

const CartProvider=({children})=>{
    const [cart,setCart]=useState(()=>{
        const saved=localStorage.getItem('cart');
        return saved?JSON.parse(saved) :[];
    });
    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart));
    },[cart]);
    return(
        <CartContext.Provider value={{cart,setCart}} >
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider