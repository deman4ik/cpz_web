import React from "react";
import withSecureHeaders from "next-secure-headers";

export const withHeaders = (Component) => withSecureHeaders()(Component);
