import planetGrey from "assets/img/planets/planet-grey.png";
import planetGreen from "assets/img/planets/planet-green.png";
import planetSky from "assets/img/planets/planet-sky.png";

export const pricingContent = [
    {
        icon: planetGreen,
        iconColors: { colorFrom: "purple", colorTo: "pink" },
        name: "Free plan",
        text: `Manual trading
        Trading signals from our robots
        
        
        Unlimited signals
        Community Chat Support
        Web Community Chat Support
        `,
        price: "0",
        buttonName: "Get\nstarted",
        buttonType: "",
        buttonBackgroundColor: "#0b98c5",
        borderColor: "#2c3454",
        href: "/auth/login"
    },
    {
        icon: planetSky,
        iconColors: { colorFrom: "#979797", colorTo: "#E5E5E5" },
        name: "Trader plan",
        text: `Fully automated trading
        Access to 135+ trading robots
        
        All free features +
        Unlimited positions & deals
        Unlimited trading volume
        No fees on trades
        Enhanced support
        `,
        price: "14,9",
        savePrice: "7,45",
        buttonName: "Start\nfree trial",
        buttonType: "",
        buttonBackgroundColor: "#1ca46b",
        borderColor: "#0b98c5",
        href: "/auth/login",
        highlite: true
    },
    {
        icon: planetGrey,
        iconColors: { colorFrom: "#74C2FB", colorTo: "#248BD6" },
        name: "The investor plan",
        text: `Portfolio management


        Cryptuoso will automatically
        allocate assets between the robots`,
        price: "",
        savePrice: "",
        buttonName: "Coming\nsoon",
        buttonType: "",
        buttonBackgroundColor: "rgba(105, 135, 185, 0.2)",
        borderColor: "#0b98c5",
        href: "/auth/login"
    }
];

export const subscriptionPlan = [
    {
        name: "TRADER PLAN",
        description:
            "All free features\n+\nFully automated trading\nAll available (125+) trading robots\nUnlimited positions & deals\nUnlimited trading volume\nNo fees on trades\nEnhanced support",
        options: [
            {
                name: "1 month",
                sort_order: 1,
                unit: "month",
                amount: 1,
                price_month: 39,
                price_total: 39,
                discount: null,
                free_months: null
            },
            {
                name: "1 year",
                sort_order: 3,
                unit: "year",
                amount: 1,
                price_month: 29,
                price_total: 349,
                discount: 25,
                free_months: 3
            },
            {
                name: "6 months",
                sort_order: 2,
                unit: "month",
                amount: 6,
                price_month: 33,
                price_total: 199,
                discount: 15,
                free_months: 1
            }
        ]
    }
];
