import React, { useState, createContext, useCallback } from "react";

export const AuthContext = createContext({ authState: null, setAuthState: null });

/*Компонент провадйер контекста*/
export const AuthContextProvider: React.FC = (props: any) => {
    const [authState, setState] = useState({ isAuth: false });
    const setAuthState = useCallback((params: any) => {
        setState({ ...params, authIsSet: true });
    }, []);
    return <AuthContext.Provider value={{ authState, setAuthState }}>{props.children}</AuthContext.Provider>;
};

export const LayoutContext = createContext({ layoutState: null, setLayoutState: null });

export const LayoutContextProvider: React.FC = ({ children }) => {
    const [layoutState, setLayoutState] = useState({ menuOpen: null });
    return <LayoutContext.Provider value={{ layoutState, setLayoutState }}>{children}</LayoutContext.Provider>;
};
