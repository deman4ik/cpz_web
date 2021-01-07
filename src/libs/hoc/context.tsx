import React, { useState, createContext, useCallback, ReactNode, Dispatch, SetStateAction } from "react";

type AuthContextPropsType = {
    children: ReactNode;
};

type AuthStateType = {
    isAuth: boolean;
    authIsSet: boolean;
    user_id?: string;
};

type AuthContextType = {
    authState: AuthStateType;
    setAuthState: Dispatch<SetStateAction<AuthStateType>>;
};

export const AuthContext = createContext<AuthContextType>(null!);

/*Компонент провадйер контекста*/
export const AuthContextProvider = ({ children }: AuthContextPropsType) => {
    const [authState, setState] = useState<AuthStateType>({ isAuth: false, authIsSet: false });
    const setAuthState = useCallback((params: any) => {
        setState({ ...params, authIsSet: true });
    }, []);
    return <AuthContext.Provider value={{ authState, setAuthState }}>{children}</AuthContext.Provider>;
};

export const LayoutContext = createContext({ layoutState: null, setLayoutState: null });

export const LayoutContextProvider: React.FC = ({ children }) => {
    const [layoutState, setLayoutState] = useState({ menuOpen: null });
    return <LayoutContext.Provider value={{ layoutState, setLayoutState }}>{children}</LayoutContext.Provider>;
};
