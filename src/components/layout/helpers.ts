import { MainMenuItemProps } from "./types";
import { PageType } from "config/types";
import { TERMS_URL, PRIVACY_URL, SUPPORT_URL, DOCS_URL, TELEGRAM_COMMUNITY_URL } from "config/constants";
import { TelegramIcon, InstagramIcon, TwitterIcon } from "assets/icons/svg";

export const MAINMENU_MAX_WIDTH = 200;
export const MAINMENU_MIN_WIDTH = 56;
export const MAINMENU_MIN_HEIGHT = 56;
export const MAINMENU_ITEMS: MainMenuItemProps[] = [
    { label: PageType.robots, icon: "robot", route: "robots" },
    { label: PageType.signals, icon: "signals", route: "signals" },
    {
        label: PageType.notifications,
        icon: "notifications",
        route: "notifications"
    },
    { label: PageType.profile, icon: "profile", route: "profile" },
    { label: PageType.support, icon: "help", route: "support" }
];

export const MANAGE_MENU_ITEMS: MainMenuItemProps[] = [
    { label: PageType.dasHboard, icon: "dashboard", route: "manage" },
    { label: PageType.users, icon: "users", route: "manage/users" }
];

export const MAINMENU_DESKTOP_ITEMS: MainMenuItemProps[] = [
    {
        label: PageType.community,
        icon: "telegram",
        href: TELEGRAM_COMMUNITY_URL
    }
];

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
        icon: "twitter"
    },
    {
        href: "https://www.instagram.com/cryptuoso",
        icon: "instagram"
    },
    {
        href: TELEGRAM_COMMUNITY_URL,
        icon: "telegram"
    }
];

export const specificIcon = {
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
