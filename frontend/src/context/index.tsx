'use client';

import { createContext, ReactNode, useState, useEffect, useContext } from 'react';

interface User {
    name: string;
    email: string;
    type: string;
    id: string;
}

type UserType = "admin" | "customer" | "guest";

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    userType: UserType;
    setUserType: (type: UserType) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userType, setUserType] = useState<UserType>("guest");

    // Load user data from local storage on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem('_digi_user');
        if (storedUser) {
            const parsedUser: User = JSON.parse(storedUser);
            setUser(parsedUser);
            setUserType(parsedUser.type as UserType);
        }
    }, []);

    // Save user data to local storage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('_digi_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('_digi_user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, userType, setUserType }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
