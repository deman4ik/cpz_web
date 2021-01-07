import React, { useState, createContext, ReactNode, Dispatch, SetStateAction } from "react";

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

export const AuthContext = createContext<AuthContextType>(null!);

const INITIAL_AUTH_STATE = {
    isAuth: false,
    authIsSet: false,
    isManager: false,
    user_id: null
};

export const AuthContextProvider = ({ children }: AuthContextPropsType) => {
    const [authState, setAuthState] = useState<AuthStateType>(INITIAL_AUTH_STATE);

    return <AuthContext.Provider value={{ authState, setAuthState }}>{children}</AuthContext.Provider>;
};

export const LayoutContext = createContext({ layoutState: null, setLayoutState: null });

export const LayoutContextProvider: React.FC = ({ children }) => {
    const [layoutState, setLayoutState] = useState({ menuOpen: null });
    return <LayoutContext.Provider value={{ layoutState, setLayoutState }}>{children}</LayoutContext.Provider>;
};
