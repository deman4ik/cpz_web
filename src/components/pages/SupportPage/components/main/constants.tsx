import React from "react";
// icons
import { RobotIcon, MultiLineChartIcon, SettingsIcon } from "assets/icons/svg";

/*icons constant*/
export const ICON_SIZE = 50;
export const ICON_COLOR = "#ffffff";
export const STEP_CARD_ICONS = {
    robots: <RobotIcon size={ICON_SIZE} color={ICON_COLOR} />,
    signals: <MultiLineChartIcon size={ICON_SIZE} color={ICON_COLOR} />,
    apiKey: <SettingsIcon size={ICON_SIZE} color={ICON_COLOR} />
};

/*steps cards interface*/
export interface stepsCard {
    title: string;
    icon?: string;
    link: string;
}

// array cards
export const STEPS_CARDS: Array<stepsCard> = [
    {
        title: "Learn about automated сryptocurrency trading with Cryptuoso Robots",
        icon: "robots",
        link: "https://support.cryptuoso.com/robots"
    },
    {
        title: "Learn about manual сryptocurrency trading with Cryptuoso Signals",
        icon: "signals",
        link: "https://support.cryptuoso.com/signals"
    },
    {
        title: "Learn how to create and configure сryptocurrency exchange API Keys with your",
        icon: "apiKey",
        link: "https://support.cryptuoso.com/exchange-accounts"
    }
];
