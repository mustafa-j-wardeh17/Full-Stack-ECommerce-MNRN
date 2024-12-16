'use client';
import { useReducer, createContext, useEffect } from 'react';

// Define types
interface User {
    email: string;
    name: string;
}

interface CartItem {
    skuId: string;
    quantity: number;
}

interface State {
    user: User | null;
}

interface Action {
    type: 'LOGIN' | 'LOGOUT' | 'UPDATE_USER';
    payload?: User;
}

interface CartAction {
    type: 'ADD_TO_CART' | 'REMOVE_FROM_CART' | 'UPDATE_CART' | 'GET_CART_ITEMS' | 'CLEAR_CART';
    payload?: CartItem;
}

interface ContextType {
    state: State;
    dispatch: React.Dispatch<Action>;
    cartItems: CartItem[];
    cartDispatch: React.Dispatch<CartAction>;
}

// Initial state
const initialState: State = {
    user: null,
};

// Create context
const Context = createContext<ContextType>({
    state: initialState,
    dispatch: () => null,
    cartItems: [],
    cartDispatch: () => null,
});

// Reducers
const rootReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload || null };
        case 'LOGOUT':
            return { ...state, user: null };
        case 'UPDATE_USER':
            return { ...state, user: action.payload || null };
        default:
            return state;
    }
};

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload!];
        case 'REMOVE_FROM_CART':
            return state.filter((item) => item.skuId !== action.payload?.skuId);
        case 'UPDATE_CART':
            return state.map((item) => (item.skuId === action.payload?.skuId ? action.payload! : item));
        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
};

// Provider component
const Provider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    const [cartItems, cartDispatch] = useReducer(cartReducer, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('_digi_user') || 'null');
        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }

        const savedCartItems = JSON.parse(localStorage.getItem('_digi_cart') || '[]');
        cartDispatch({ type: 'GET_CART_ITEMS', payload: savedCartItems });
    }, []);

    return (
        <Context.Provider value={{ state, dispatch, cartItems, cartDispatch }}>
            {children}
        </Context.Provider>
    );
};

export { Context, Provider };
