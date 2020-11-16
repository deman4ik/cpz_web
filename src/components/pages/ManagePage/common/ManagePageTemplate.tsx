import React from "react";
import { DocumentNode } from "@apollo/client";
// components
import { ManagementTemplate } from "components/layout";
// hooks
import { POLL_INTERVAL } from "config/constants";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";
import { ColumnsArraySchema } from "../utils";
import { PageType } from "config/types";
import { TableComponent } from "components/pages/ManagePage/common/TableComponent";
import { useTableFilters } from "hooks/useTableFilters";
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
};

const ManagePageTemplate = ({
    pageType,
    columns,
    dataQuery,
    aggregateQuery,
    formatData,
    getItemsCount,
    tableStyles,
    getSearchOptions
}: ManagePageProps): JSX.Element => {
    return (
        <ManagementTemplate title={pageType} page={pageType}>
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
    );
};

ManagePageTemplate.defaultProps = {
    tableStyles: null
};

export default ManagePageTemplate;
