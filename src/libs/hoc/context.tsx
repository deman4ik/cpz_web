import React, { useState, createContext, useCallback, useMemo, useEffect } from "react";
import Router from "next/router";
import { PREV_ROUTE, setDataInCookie, getPreviousRoute } from "utils/common";

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

export const HistoryContext = createContext({ historyState: null, setHistory: null });

export const HistoryContextProvider: React.FC = ({ children }) => {
    const prevRoute = getPreviousRoute();
    const MAX_HISTORY_STACK = 2;
    const [historyState, setHistory] = useState({ history: [prevRoute], prevRoute });

    useMemo(() => {
        Router.events.on("routeChangeStart", (url) => {
            setHistory((_historyState) => {
                const history = _historyState.history.slice();
                history.push(url);
                if (history.length > MAX_HISTORY_STACK) {
                    history.splice(0, 1);
                }
                setDataInCookie(PREV_ROUTE, history[1]);
                return { ..._historyState, history, prevRoute: history[1] };
            });
        });
    }, []);
    return <HistoryContext.Provider value={{ historyState, setHistory }}>{children}</HistoryContext.Provider>;
};
