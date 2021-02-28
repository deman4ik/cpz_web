/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
export const GA_TRACKING_ID = "G-37BGBQ6GCK";
export const AW_CONVERSION_ID = "AW-971308941";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    if (process.env.ENABLE_ANALYTICS === "development") return;
    (window as any).gtag("config", GA_TRACKING_ID, {
        page_path: url,
        debug_mode: process.env.DEBUG_MODE
    });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value, robot_code }) => {
    if (process.env.ENABLE_ANALYTICS === "development") return;
    (window as any).gtag("event", action, {
        event_source: "web",
        event_category: category,
        event_label: label,
        value,
        robot_code
    });
};

export const gtag_report_conversion = (url: string) => {
    if (process.env.ENABLE_ANALYTICS === "development") return false;
    const callback = () => {
        if (typeof url !== "undefined") {
            (window as any).location = url;
        }
    };
    (window as any).gtag("event", "conversion", {
        send_to: `${AW_CONVERSION_ID}/uw4YCJqWic4BEI3_k88D`,
        event_callback: callback
    });
    return false;
};
