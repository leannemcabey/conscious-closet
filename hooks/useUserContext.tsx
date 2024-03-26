// I DON'T THINK I NEED ANY OF THIS BECAUSE SUPABASE ALWAYS GIVES ME
// ACCESS TO THE USER THROUGH THE CLIENT

// 'use client'
//
// import { createContext, useContext } from "react";
// import { User } from "@/types/user";
//
// interface UserContextType {
//     authenticatedUser: User | undefined;
//     login: (user: User) => void;
// };
//
// const userContextDefaultValues: UserContextType = {
//     authenticatedUser: undefined,
//     login: (user: User) => {}
// };
//
// export const UserContext = createContext<UserContextType>(userContextDefaultValues);
//
// export const useUserContext = () => {
//     return useContext(UserContext);
// }