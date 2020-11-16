import { PageType } from "config/types";
import { DEAD_LETTERS, DEAD_LETTERS_AGGREGATE } from "graphql/manage/queries";
import React from "react";
import ManagePageTemplate from "../common/ManagePageTemplate";
import { DEAD_LETTERS_TABLE_COLUMNS } from "./constatnds";

const DeadLettersPage = (): JSX.Element => {
    return (
        <ManagePageTemplate
            pageType={PageType.deadLetters}
            columns={DEAD_LETTERS_TABLE_COLUMNS}
            dataQuery={DEAD_LETTERS}
            aggregateQuery={DEAD_LETTERS_AGGREGATE}
            formatData={(data) => data.dead_letters}
            getItemsCount={(data) => data.aggregate.nodes}
            getSearchOptions={() => null}
        />
    );
};

export default DeadLettersPage;
