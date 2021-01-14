import React from "react";
import { DocumentNode } from "@apollo/client";
// components
import { ManagementTemplate } from "components/layout";
// hooks
import { ColumnsArraySchema } from "../utils";
import { PageType } from "config/types";
import { TableWithQuery } from "components/pages/ManagePage/common/TableWithQuery";

type ManagePageProps = {
    tableStyles?: any;
    pageType: PageType;
    columns: ColumnsArraySchema;
    dataQuery: DocumentNode;
    aggregateQuery: DocumentNode;
    formatData: (data: any) => any;
    getItemsCount: (data: any) => number;
    getSearchOptions: (data: any) => any;
    toolbar?: JSX.Element;
};

const ManagePageTemplate = ({
    pageType,
    columns,
    dataQuery,
    aggregateQuery,
    formatData,
    getItemsCount,
    tableStyles,
    getSearchOptions,
    toolbar
}: ManagePageProps): JSX.Element => {
    return (
        <>
            <ManagementTemplate title={pageType} page={pageType} toolbar={toolbar}>
                <TableWithQuery
                    tableStyles={tableStyles}
                    aggregate_query={aggregateQuery}
                    query={dataQuery}
                    columns={columns}
                    formatData={formatData}
                    getItemsCount={getItemsCount}
                    getSearchOptions={getSearchOptions}
                />
            </ManagementTemplate>
        </>
    );
};

ManagePageTemplate.defaultProps = {
    tableStyles: null,
    toolbar: null
};

export default ManagePageTemplate;
