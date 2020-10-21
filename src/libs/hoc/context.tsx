import React, { useState, createContext, useCallback, useMemo, useEffect } from "react";
import Router from "next/router";
import { PREV_ROUTE, setDataInCookie, getPreviousRoute } from "utils/common";
import { HistoryStack } from "libs/HistoryStack";

export const AuthContext = createContext({ authState: null, setAuthState: null });

/*Компонент провадйер контекста*/
export const AuthContextProvider: React.FC = (props: any) => {
    const [authState, setAuthState] = useState({ isAuth: false });
    return <AuthContext.Provider value={{ authState, setAuthState }}>{props.children}</AuthContext.Provider>;
};

export const LayoutContext = createContext({ layoutState: null, setLayoutState: null });

export const LayoutContextProvider: React.FC = ({ children }) => {
    const [layoutState, setLayoutState] = useState({ menuOpen: null });
    return <LayoutContext.Provider value={{ layoutState, setLayoutState }}>{children}</LayoutContext.Provider>;
};

export const HistoryContext = createContext({ historyState: null, setHistory: null, setPrevRoute: null });
const MAX_HISTORY_STACK = 2;
const history = new HistoryStack(MAX_HISTORY_STACK);
const prevRoute = getPreviousRoute() || "/";

export const HistoryContextProvider: React.FC = ({ children }) => {
    const [historyState, setHistory] = useState({ prevRoute });

    useEffect(() => {
        history.push(prevRoute);
    }, []);

    const setPrevRoute = (url: string) => setHistory((_historyState) => ({ ..._historyState, prevRoute: url }));

    useMemo(() => {
        Router.events.on("routeChangeStart", (url) => {
            const previousRoute = history.last;
            history.push(url);
            setDataInCookie(PREV_ROUTE, previousRoute);
            setHistory((_historyState) => {
                return { ..._historyState, prevRoute: previousRoute };
            });
        });
    }, []);
    return (
        <HistoryContext.Provider value={{ historyState, setHistory, setPrevRoute }}>{children}</HistoryContext.Provider>
    );
};
