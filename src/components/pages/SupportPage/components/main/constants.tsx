import React from "react";
// constants
import { TELEGRAM_COMMUNITY_URL } from "config/constants";
//styles
import styles from "../../styles/Main.module.css";
// icons
import { RobotIcon, MultiLineChartIcon, SettingsIcon, TelegramIcon, AccountPlus, EmailIcon } from "assets/icons/svg";
import stylesMain from "components/pages/SupportPage/styles/Main.module.css";

/*icons constant*/
export const ICON_SIZE = 35;
export const ICON_COLOR = "#ffffff";
export const STEP_CARD_ICONS = {
    robots: <RobotIcon size={ICON_SIZE} color={ICON_COLOR} />,
    signals: <MultiLineChartIcon size={ICON_SIZE} color={ICON_COLOR} />,
    apiKey: <SettingsIcon size={ICON_SIZE} color={ICON_COLOR} />,
    community: <TelegramIcon size={ICON_SIZE} color={ICON_COLOR} />,
    accountPlus: <AccountPlus size={ICON_SIZE} color={ICON_COLOR} />,
    email: <EmailIcon size={ICON_SIZE} color={ICON_COLOR} />
};

/*steps card interface*/
export interface stepsCard {
    title: React.ReactNode | string;
    icon?: string;
    link: string;
}

/*Main steps cards*/
export const STEPS_CARDS: Array<stepsCard> = [
    {
        title: (
            <>
                Learn about automated сryptocurrency trading with
                <span className={styles.step_card_accent}> Cryptuoso Robots</span>
            </>
        ),
        icon: "robots",
        link: "https://support.cryptuoso.com/robots"
    },
    {
        title: (
            <>
                Learn about manual сryptocurrency trading with
                <span className={styles.step_card_accent}> Cryptuoso Signals</span>
            </>
        ),
        icon: "signals",
        link: "https://support.cryptuoso.com/signals"
    },
    {
        title: (
            <>
                Learn how to create and configure сryptocurrency exchange API Keys with your
                <span className={styles.step_card_accent}> Cryptuoso Account</span>
            </>
        ),
        icon: "apiKey",
        link: "https://support.cryptuoso.com/exchange-accounts"
    }
];

/*Telegram card*/
export const TG_CARD = {
    title: (
        <>
            Having common questions with signals or robots? Ask it in our
            <span className={stylesMain.step_card_accent}> Telegram Community</span> and we will help you.
        </>
    ),
    icon: "community",
    link: TELEGRAM_COMMUNITY_URL
};

/*First not auth card*/
export const NOT_AUTH_CARD = {
    title: (
        <>
            Create your <span className={stylesMain.step_card_accent}>Cryptuoso Account</span> with Telegram or Email
        </>
    ),
    icon: "accountPlus",
    link: "/auth/login"
};

/*Second not auth card*/
export const NOT_AUTH_CARD_SECOND = {
    title: (
        <div>
            Can&apos;t create or activate your account? Send us email to
            <span className={stylesMain.step_card_accent}> support@cryptuoso.com</span>
        </div>
    ),
    icon: "email",
    link: "mailto:support@cryptuoso.com"
};
