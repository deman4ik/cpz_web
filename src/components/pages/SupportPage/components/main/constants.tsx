import React from "react";
import { TELEGRAM_COMMUNITY_URL } from "config/constants";
import stylesMain from "components/pages/SupportPage/styles/Main.module.css";
import { TelegramIcon, EmailIcon } from "assets/icons/svg";

export interface stepsCard {
    title: React.ReactNode | string;
    icon?: React.FC<{
        color?: string;
        size?: number;
    }>;
}

export const TG_CARD = {
    title: (
        <div>
            Have questions regarding signals or robots? Ask in our{" "}
            <a href={TELEGRAM_COMMUNITY_URL} className={stylesMain.step_card_accent}>
                Telegram Community
            </a>{" "}
            and we will help you.
        </div>
    ),
    icon: TelegramIcon
};

export const AUTH_HELP_CARD = {
    title: (
        <div>
            Can&apos;t create or activate your account? Reach us at{" "}
            <a href="mailto:support@cryptuoso.com" className={stylesMain.step_card_accent}>
                support@cryptuoso.com
            </a>
        </div>
    ),
    icon: EmailIcon
};
