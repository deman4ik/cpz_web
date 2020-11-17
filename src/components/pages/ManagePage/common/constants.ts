export const ITEMS_PER_PAGE_OPTIONS =
    process.env.NODE_ENV === "development"
        ? [100, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 20, 25, 50]
        : [100, 500, 1000];
