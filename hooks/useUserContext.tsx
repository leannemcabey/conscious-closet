'use client'

import { createContext, useContext } from "react";
import { User } from "@/types/user";

interface UserContextType {
    authenticatedUser: User | undefined;
    login: (user: User) => void;
};

const userContextDefaultValues: UserContextType = {
    authenticatedUser: undefined,
    login: (user: User) => {}
};

export const UserContext = createContext<UserContextType>(userContextDefaultValues);

export const useUserContext = () => {
    return useContext(UserContext);
}