import Router from "next/router";
import { useApolloClient } from "@apollo/client";

import { useLogout } from "libs/auth";
import { useEffect } from "react";

export const useLogoutProcess = (): any => {
    const client = useApolloClient();

    const [logout, { loading, success, error }] = useLogout();

    useEffect(() => {
        if (success) {
            client.clearStore().then(() => Router.push("/auth/login"));
            if (typeof window !== "undefined") localStorage.removeItem("refreshTokenSet");
        } else if (error) {
            console.error(error);
        }
    }, [client, success, error]);

    return [logout, { loading }];
};
