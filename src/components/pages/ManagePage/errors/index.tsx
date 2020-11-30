import { PageType } from "config/types";
import { ERROR_EVENTS, ERROR_EVENTS_AGGREGATE } from "graphql/manage/queries";
import React from "react";
import ManagePageTemplate from "../common/ManagePageTemplate";
import { ERROR_EVENTS_TABLE_COLUMNS } from "./constants";
import { getSearchOptions, getItemsCount, parseErrors } from "./utils";

const ErrorsPage = (): JSX.Element => {
    return (
        <ManagePageTemplate
            pageType={PageType.errors}
            columns={ERROR_EVENTS_TABLE_COLUMNS}
            dataQuery={ERROR_EVENTS}
            aggregateQuery={ERROR_EVENTS_AGGREGATE}
            formatData={parseErrors}
            getItemsCount={getItemsCount}
            getSearchOptions={getSearchOptions}
        />
    );
};

export default ErrorsPage;
