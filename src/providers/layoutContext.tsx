import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type LayoutContextPropsType = {
    children: ReactNode;
};

type LayoutStateType = {
    menuOpen: boolean;
};

type LayoutContextType = {
    layoutState: LayoutStateType;
    setLayoutState: Dispatch<SetStateAction<LayoutStateType>>;
};

export const LayoutContext = createContext<LayoutContextType>(null!);

const INITIAL_LAYOUT_STATE = {
    menuOpen: false
};

export const LayoutContextProvider = ({ children }: LayoutContextPropsType) => {
    const [layoutState, setLayoutState] = useState<LayoutStateType>(INITIAL_LAYOUT_STATE);

    return <LayoutContext.Provider value={{ layoutState, setLayoutState }}>{children}</LayoutContext.Provider>;
};
