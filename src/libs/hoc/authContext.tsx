import React, { useState, createContext } from "react";

export const AuthContext = createContext({ authState: null, setAuthState: null });

export const AuthContextProvider: React.FC = (props: any) => {
    const [authState, setAuthState] = useState({ isAuth: false });
    return <AuthContext.Provider value={{ authState, setAuthState }}>{props.children}</AuthContext.Provider>;
};
