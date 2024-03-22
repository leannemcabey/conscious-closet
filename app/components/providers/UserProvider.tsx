'use client'

import { ReactNode, useState } from "react";
import { UserContext } from "@/hooks/useUserContext";
import {User} from "@/types/user";

interface UserProviderProps {
    children: ReactNode
}

export const UserProvider = (props: UserProviderProps) => {
    const [authenticatedUser, setAuthenticatedUser] = useState<User | undefined>(undefined);

    const login = (user: User) => {
        setAuthenticatedUser(user)
    }

    const value = {
        authenticatedUser,
        login
    }

    return (
        <>
            <UserContext.Provider value={value}>
                {props.children}
            </UserContext.Provider>
        </>
    );
}