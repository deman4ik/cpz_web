import { MainMenuItemProps } from "./types";
import { PageType } from "config/types";
import { TERMS_URL, PRIVACY_URL, SUPPORT_URL, DOCS_URL, TELEGRAM_COMMUNITY_URL } from "config/constants";
import { TelegramIcon, InstagramIcon, TwitterIcon } from "assets/icons/svg";

export const MAINMENU_MAX_WIDTH = 200;
export const MAINMENU_MIN_WIDTH = 56;
export const MAINMENU_MIN_HEIGHT = 56;

export const linksHeader = [
    {
        title: "Robots",
        href: "/robots"
    },
    {
        title: "Signals",
        href: "/signals"
    },
    {
        title: "Notifications",
        href: "/notifications"
    },
    {
        title: "Profile",
        href: "/profile"
    }
];

export const authHeader = [
    {
        title: "Log in",
        href: "/auth/login"
    },
    {
        title: "Sign up",
        href: "/auth/signup"
    }
];

export const footerIcons = [
    {
        href: "https://twitter.com/cryptuoso",
        icon: TwitterIcon
    },
    {
        href: "https://www.instagram.com/cryptuoso",
        icon: InstagramIcon
    },
    {
        href: TELEGRAM_COMMUNITY_URL,
        icon: TelegramIcon
    }
];

export const contactIcons = {
    telegram: TelegramIcon,
    instagram: InstagramIcon,
    twitter: TwitterIcon
};

export const footerLinks = [
    {
        href: `${DOCS_URL}${TERMS_URL}`,
        name: "Terms"
    },
    {
        href: `${DOCS_URL}${PRIVACY_URL}`,
        name: "Privacy"
    },
    {
        href: `${SUPPORT_URL}`,
        name: "Support"
    }
];
