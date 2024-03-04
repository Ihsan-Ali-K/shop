import React, { createContext, useReducer, useContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) =>{
 switch(action.type){
    case "ADD_TO_CART":
        return[...state,{id:action.id, name:action.name,qty:action.qty, price:action.price }]
        
    case "REMOVE":
        let newArry = [...state]
        newArry.splice(action.index, 1)
        return newArry;  
    case "DROP":
        let empArray =[]
        return empArray      
        
        default:
            console.log('error in dispatch')
 }
}

export const CartProvider =({children}) =>{
    const [state, dispatch] = useReducer(reducer, [])

    return(
        <CartDispatchContext.Provider value={dispatch} >
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)