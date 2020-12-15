import React, { useContext } from "react";

import {
    RobotIcon,
    MultiLineChartIcon,
    TelegramIcon,
    AccountPlus,
    PlayListCheck,
    MessageAlert,
    ShieldKey,
    PlusBox,
    Check
} from "assets/icons/svg";
import { Button, CaptionButton } from "components/basic";
import Router from "next/router";
import { AuthContext } from "libs/hoc/context";
import { GET_USER_INFO } from "graphql/user/queries";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";

const DocsButton = ({ href }) => <CaptionButton title="DOCS" icon="docs" href={href} />;
const InlineDiv = ({ children }) => <div style={{ display: "flex", alignItems: "center" }}>{children}</div>;
const ProfileButtonIfNoTg = () => {
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const { data } = useQueryWithAuth(true, GET_USER_INFO, { variables: { user_id } });

    return (
        (data && data.users[0] && !data.users[0].telegram_id && (
            <Button title="PROFILE" type="success" onClick={() => Router.push("/profile")} />
        )) ||
        null
    );
};

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
            <>
                Learn about manual сryptocurrency trading with Cryptuoso Signals.
                <DocsButton href="https://support.cryptuoso.com/signals" />
            </>
        ),
        icon: MultiLineChartIcon
    },
    {
        title: (
            <>
                Subscribe to Signal Robot and enter your trading amount.
                <InlineDiv>
                    <Button title="ADD SIGNALS +" type="primary" onClick={() => Router.push("/signals/search")} />
                    <DocsButton href="https://support.cryptuoso.com/signals#howtosubscribeonsignalsinourwebapp?" />
                </InlineDiv>
            </>
        ),
        icon: PlayListCheck
    },
    {
        title: (
            <>
                Wait for Signals and execute them on your exchange.
                <DocsButton href="https://support.cryptuoso.com/signals#howtounderstandsignalsandwhattodo?" />
            </>
        ),
        icon: MessageAlert
    },
    {
        title: (
            <>
                Add your Telegram account and turn on notifications on Profile Page to immediately receive signals.
                <ProfileButtonIfNoTg />
            </>
        ),
        icon: TelegramIcon
    }
];

export const ROBOTS_CARDS: Array<stepsCard> = [
    {
        title: (
            <>
                Learn about automated сryptocurrency trading with Cryptuoso Robots.
                <DocsButton href="https://support.cryptuoso.com/robots" />
            </>
        ),
        icon: RobotIcon
    },
    {
        title: (
            <>
                Generate your API Keys on your exchange and add them to your Cryptuoso Account.
                <InlineDiv>
                    <Button title="ADD KEY +" type="primary" onClick={() => Router.push("/profile")} />
                    <DocsButton href="https://support.cryptuoso.com/exchange-accounts" />
                </InlineDiv>
            </>
        ),
        icon: ShieldKey
    },
    {
        title: (
            <>
                Add chosen Robot, link it with your API Keys and enter your trading amount.
                <InlineDiv>
                    <Button title="ADD ROBOTS +" type="primary" onClick={() => Router.push("/robots/search")} />
                    <DocsButton href="https://support.cryptuoso.com/robots#howtostartrobotinourwebapp?" />
                </InlineDiv>
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
        <>
            Create your Cryptuoso Account with Telegram or Email.
            <InlineDiv>
                <Button title="LOG IN" type="success" onClick={() => Router.push("/auth/login")} />
                <DocsButton href="https://support.cryptuoso.com/help" />
            </InlineDiv>
        </>
    ),
    icon: AccountPlus
};
