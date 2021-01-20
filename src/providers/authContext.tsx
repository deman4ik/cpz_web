import React, { FC, createContext, Dispatch, ReactNode, SetStateAction, useState, ReactElement } from "react";

type AuthContextPropsType = {
    children: ReactNode;
};

type AuthStateType = {
    isAuth: boolean;
    authIsSet: boolean;
    user_id: string | null;
    isManager?: boolean;
};

type AuthContextType = {
    authState: AuthStateType;
    setAuthState: Dispatch<SetStateAction<AuthStateType>>;
};

export const AuthContext = createContext<AuthContextType>(undefined);

const INITIAL_AUTH_STATE = {
    isAuth: false,
    authIsSet: false,
    isManager: false,
    user_id: null
};

export const AuthContextProvider: FC<AuthContextPropsType> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthStateType>(INITIAL_AUTH_STATE);

    return <AuthContext.Provider value={{ authState, setAuthState }}>{children}</AuthContext.Provider>;
};
