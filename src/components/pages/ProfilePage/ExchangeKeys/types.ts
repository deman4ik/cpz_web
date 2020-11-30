export enum ModalKey {
    addKey,
    deleteKey,
    editName
}

export interface AddKey {
    name: string;
    id: string;
    exchange: string;
    status: string;
}

export interface DeleteKey {
    id: string;
    name: string;
}
export interface EditName {
    id: string;
    name: string;
}
export type Keys = {
    key: string;
    secret: string;
};
export type UpdateExchangeKeyVars = {
    name: string;
    exchange: string;
    keys: Keys;
    id?: string;
};

export interface ExchangeKeysAddKeyModalProps {
    options?: AddKey;
    exchange?: string;
    refetchQueries?: any; // Todo any
    isExchangeDisabled?: boolean;
    onClose?: (changesMade?: boolean) => void;
    handleOnSubmit?: (key: string) => void;
    displayGuide?: boolean;
}
