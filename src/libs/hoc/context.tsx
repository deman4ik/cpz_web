import React, { useState, createContext, useCallback, ReactNode, Dispatch, SetStateAction } from "react";

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

/*Компонент провадйер контекста*/
export const AuthContextProvider = ({ children }: AuthContextPropsType) => {
    const INITIAL_AUTH_STATE = {
        isAuth: false,
        authIsSet: true,
        isManager: false,
        user_id: null
    };

    const [authState, setState] = useState<AuthStateType>(INITIAL_AUTH_STATE);
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
