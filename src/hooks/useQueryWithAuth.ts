import { useContext, useEffect } from "react";
import { AuthContext } from "libs/hoc/context";
import { DocumentNode, LazyQueryHookOptions, LazyQueryResult, TypedDocumentNode, useLazyQuery } from "@apollo/client";
import { httpErrors } from "config/constants";
import { useRefreshToken } from "libs/accessToken";

export const useQueryWithAuth = (
    authRequired: boolean,
    query: DocumentNode | TypedDocumentNode<any, any>,
    options: LazyQueryHookOptions<any, any>
): LazyQueryResult<any, any> => {
    const { authState } = useContext(AuthContext);
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

    return result;
};
