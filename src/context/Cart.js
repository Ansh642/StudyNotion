import { createContext,useEffect,useState } from "react";
export const CartContext = createContext();

export function CartProvider({children}){

    const [cart, setcart] = useState([]);

    const fetchProduct =()=>{
        let existingProduct = localStorage.getItem('cart');
        setcart(JSON.parse(existingProduct));
    }

    useEffect( ()=>{
        fetchProduct();
    },[]);

    const value={
        cart,setcart
    }

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>

}

