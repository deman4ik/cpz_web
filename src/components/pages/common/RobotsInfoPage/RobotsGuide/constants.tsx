import React from "react";
import Link from "next/link";
import { TELEGRAM_COMMUNITY_URL } from "config/constants";
import styles from "./styles/Main.module.css";
import stylesMain from "components/pages/SupportPage/styles/Main.module.css";

import {
    RobotIcon,
    MultiLineChartIcon,
    TelegramIcon,
    AccountPlus,
    EmailIcon,
    TextSearch,
    PlayListCheck,
    MessageAlert,
    ShieldKey,
    PlusBox,
    Check
} from "assets/icons/svg";
import { CaptionButton } from "components/basic";

export interface stepsCard {
    title: React.ReactNode | string;
    icon?: React.FC<{
        color?: string;
        size?: number;
    }>;
}

export const SIGNALS_CARDS: Array<stepsCard> = [
    {
        title: (
            <div>
                Learn about manual сryptocurrency trading with{" "}
                <a href="https://support.cryptuoso.com/signals" className={styles.step_card_accent}>
                    Cryptuoso Signals.
                </a>
            </div>
        ),
        icon: MultiLineChartIcon
    },
    {
        title: (
            <>
                <div>
                    Choose robot for manual trading on{" "}
                    <Link href="/signals/search">
                        <span className={styles.step_card_accent}>Signals Page</span>
                    </Link>
                    .
                </div>
                <CaptionButton
                    title="Learn how"
                    icon="chevronright"
                    href="https://support.cryptuoso.com/signals#howtochooseasignalrobottofollow?"
                />
            </>
        ),
        icon: TextSearch
    },
    {
        title: (
            <>
                Subscribe to Signal Robot and enter your trading amount.{" "}
                <CaptionButton
                    title="Learn how"
                    icon="chevronright"
                    href="https://support.cryptuoso.com/signals#howtosubscribeonsignalsinourwebapp?"
                />
            </>
        ),
        icon: PlayListCheck
    },
    {
        title: (
            <div>
                Wait for Signals and execute them on your exchange{" "}
                <Link href="/signals/search">
                    <span className={styles.step_card_accent}>Signals Page.</span>
                </Link>
            </div>
        ),
        icon: MessageAlert
    },
    {
        title: (
            <div>
                Add your Telegram account and turn on notifications on{" "}
                <Link href="/profile">
                    <span className={styles.step_card_accent}>Profile Page</span>
                </Link>{" "}
                to immediately receive signals.
            </div>
        ),
        icon: TelegramIcon
    }
];

export const ROBOTS_CARDS: Array<stepsCard> = [
    {
        title: (
            <div>
                Learn about automated сryptocurrency trading with{" "}
                <a href="https://support.cryptuoso.com/robots" className={styles.step_card_accent}>
                    Cryptuoso Robots.
                </a>
            </div>
        ),
        icon: RobotIcon
    },
    {
        title: (
            <>
                Generate your API Keys on your exchange and add them to your Cryptuoso Account.{" "}
                <CaptionButton
                    title="Learn how"
                    icon="chevronright"
                    href="https://support.cryptuoso.com/exchange-accounts"
                />
            </>
        ),
        icon: ShieldKey
    },
    {
        title: (
            <>
                <div>
                    Choose robot for automated trading on{" "}
                    <Link href="/robots/search">
                        <span className={styles.step_card_accent}>Robots Page</span>
                    </Link>
                    .
                </div>
                <CaptionButton
                    title="Learn how"
                    icon="chevronright"
                    href="https://support.cryptuoso.com/robots#howtochoosearobot?"
                />
            </>
        ),
        icon: TextSearch
    },
    {
        title: (
            <>
                Add chosen Robot, enter your trading amount and link it with your API Keys.{" "}
                <CaptionButton
                    title="Learn how"
                    icon="chevronright"
                    href="https://support.cryptuoso.com/robots#howtostartrobotinourwebapp?"
                />
            </>
        ),
        icon: PlusBox
    },
    {
        title: <>Start Robot and wait for deals. Robot will do all trading automatically for you.</>,
        icon: Check
    }
];

export const CREATE_ACCOUNT_CARD = {
    title: (
        <div>
            Create your{" "}
            <Link href="/auth/login">
                <span className={stylesMain.step_card_accent}>Cryptuoso Account</span>
            </Link>{" "}
            with Telegram or Email.
        </div>
    ),
    icon: AccountPlus
};
