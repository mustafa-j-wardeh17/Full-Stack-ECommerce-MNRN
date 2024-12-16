'use client'
import { useRouter } from 'next/navigation';
import { useReducer, createContext, useEffect } from 'react';

type Props = {
    children: React.ReactNode;
};

// initial state
const initialState = {
    user: null,
};

type Context = {
    state: Record<string, any>;
    dispatch: (action: {
        type: string;
        payload: Record<string, any> | undefined;
    }) => void;
    cartItems: any;
    cartDispatch: (action: {
        type: string;
        payload: Record<string, any>;
    }) => void;
};

const initialContext: Context = {
    state: initialState,
    dispatch: () => { },
    cartItems: [],
    cartDispatch: () => {
        throw new Error('Function not implemented.');
    },
};

// create context
const Context = createContext<Context>(initialContext);

// root reducer
const rootReducer = (
    state: Record<string, any>,
    action: { type: string; payload: Record<string, any> | undefined }
) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload };
        case 'LOGOUT':
            return { ...state, user: null };
        case 'UPDATE_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

// cart reducer
const cartReducer = (
    state: any,
    action: { type: string; payload: Record<string, any> | undefined }
) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const cartItems = [...state, action.payload];
            window.localStorage.setItem('_digi_cart', JSON.stringify(cartItems));
            return cartItems;
        case 'REMOVE_FROM_CART':
            const newCartItems = state.filter(
                (item: { skuId: string }) => item.skuId !== action.payload?.skuId
            );
            window.localStorage.setItem('_digi_cart', JSON.stringify(newCartItems));
            return newCartItems;
        case 'UPDATE_CART':
            const updatedCartItems = state.map((item: any) => {
                if (item.skuId === action.payload?.skuId) {
                    return action.payload;
                }
                return item;
            });
            window.localStorage.setItem('_digi_cart', JSON.stringify(updatedCartItems));
            return updatedCartItems;
        case 'GET_CART_ITEMS':
            return action.payload;
        case 'CLEAR_CART':
            window.localStorage.removeItem('_digi_cart');
            return [];
        default:
            return state;
    }
};

// context provider
const Provider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    const [cartItems, cartDispatch] = useReducer(cartReducer, []);

    // router
    const router = useRouter();

    useEffect(() => {
        dispatch({
            type: 'LOGIN',
            payload: JSON.parse(window.localStorage.getItem('_digi_user') || '{}'),
        });
        const cartItems = JSON.parse(
            window.localStorage.getItem('_digi_cart') || '[]'
        );
        cartDispatch({ type: 'GET_CART_ITEMS', payload: cartItems });
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/logout`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('/401 error > logout');
                dispatch({
                    type: 'LOGOUT',
                    payload: undefined,
                });
                localStorage.removeItem('_digi_user');
                router.push('/auth');
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/csrf-token`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch CSRF token');
                }
                const data = await response.json();
                const csrfToken = data.result.csrfToken;
                console.log('csrf ===>', csrfToken)
                if (!csrfToken) {
                    throw new Error('CSRF Token not found');
                }
                console.log('CSRF Token', csrfToken);
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        };
        fetchCsrfToken();
    }, []);

    return (
        <Context.Provider value={{ state, dispatch, cartItems, cartDispatch }}>
            {children}
        </Context.Provider>
    );
};

export { Context, Provider };
