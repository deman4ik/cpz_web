import Router from "next/router";
import { useApolloClient } from "@apollo/client";

import { useLogout } from "libs/auth";
import { useEffect } from "react";

export const useLogoutProcess = (): any => {
    const client = useApolloClient();

    const [logout, { success, error }] = useLogout();

    const logoutProcess = () => {
        logout();
    };

    useEffect(() => {
        if (success) {
            client.clearStore().then(() => Router.push("/auth/login"));
        } else if (error) {
            console.error(error);
        }
    }, [client, success, error]);

    return { logoutProcess };
};
