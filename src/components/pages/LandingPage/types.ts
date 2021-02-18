export type SupportItemType = {
    icon: string;
    iconColor: string;
    title: string;
    text: string;
    button: string;
    buttonType: string;
    href: string;
};

export type PricingItemType = {
    icon?: string;
    iconColors?: { colorFrom: string; colorTo: string };
    title?: string;
    text?: string;
    price?: string;
    savePrice?: string;
    button?: string;
    buttonType?: string;
    href?: string;
    highlite?: boolean;
    borderColor?: string;
    buttonBackgroundColor?: string;
};

export type PricingPlanItemType = {
    name: string;
    price_month: string;
    free_month: string;
};

export interface StepProps {
    date: string;
    title: string;
}

export type TradingStepType = {
    accent: string;
    text: string;
};

export type DescriptionRobotsType = {
    imgStyle: { width: number; height: number };
    title: string;
    text: string;
};

export type DescriptionFirstLineType = {
    imgStyle: { width: number; height: number };
    imgSrc: string;
    title: string;
    text: string;
};
