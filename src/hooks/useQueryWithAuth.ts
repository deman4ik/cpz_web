import { useContext, useEffect } from "react";
import { AuthContext } from "libs/hoc/context";
import { LazyQueryHookOptions, LazyQueryResult, useLazyQuery } from "@apollo/client";
import { QueryType } from "components/pages/ManagePage/common/types";

export const useQueryWithAuth = (
    authRequired: boolean,
    query: QueryType,
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
