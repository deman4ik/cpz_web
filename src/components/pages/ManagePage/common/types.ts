import { DocumentNode, TypedDocumentNode } from "@apollo/client";

export type QueryType = DocumentNode | TypedDocumentNode<any, any>;
