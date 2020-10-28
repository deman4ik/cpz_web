import { useContext, useEffect } from "react";
import { AuthContext } from "libs/hoc/context";
import { DocumentNode, LazyQueryHookOptions, LazyQueryResult, TypedDocumentNode, useLazyQuery } from "@apollo/client";
import { httpErrors } from "config/constants";

export const useQueryWithAuth = (
    authRequired: boolean,
    query: DocumentNode | TypedDocumentNode<any, any>,
    options: LazyQueryHookOptions<any, any>
): LazyQueryResult<any, any> => {
    const { authState, setAuthState } = useContext(AuthContext);
    const { authIsSet, isAuth, user_id } = authState;

    const [getData, result] = useLazyQuery(query, options);

    useEffect(() => {
        if (!result.data && authIsSet) {
            if (!authRequired) {
                getData();
            } else if (user_id && isAuth) {
                getData();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authIsSet, isAuth]);

    useEffect(() => {
        if (result.data && isAuth) {
            result
                .refetch()
                .then((res) => console.log(res, "RENEWED"))
                .catch((e) => console.log(e, "ERROR"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]);

    useEffect(() => {
        if (result.error && setAuthState) {
            const tokenExpiredError = result.error.graphQLErrors.some(
                (graphqlError) => graphqlError.extensions.code === httpErrors.JWTError
            );
            if (tokenExpiredError) {
                setAuthState({ isAuth: false });
            }
        }
    }, [result.error, setAuthState]);

    return result;
};
