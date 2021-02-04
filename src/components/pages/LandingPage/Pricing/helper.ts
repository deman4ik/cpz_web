import planetPink from "assets/img/planets/planet-pink.png";
import planetGreen from "assets/img/planets/planet-green.png";
import planetSky from "assets/img/planets/planet-sky.png";
import planetYellow from "assets/img/planets/planet-yellow.png";

export const pricingContent = [
    {
        icon: planetPink,
        iconColors: { colorFrom: "purple", colorTo: "pink" },
        title: "1 months",
        text: `Daily Signals from our Robots
            Telegram public channel
            Instagram public page
            Telegram Community Support
            Web Community Chat Support`,
        price: "0",
        button: "Get started",
        buttonType: "outline-pink",
        href: "#"
    },
    {
        icon: planetGreen,
        iconColors: { colorFrom: "#979797", colorTo: "#E5E5E5" },
        title: "6 months",
        text: `Daily Signals from our Robots
            Telegram public channel
            Instagram public page
            Telegram Community Support`,
        price: "14,9",
        savePrice: "7,45",
        button: "Get started",
        buttonType: "outline-secondary",
        href: "#"
    },
    {
        icon: planetSky,
        iconColors: { colorFrom: "#74C2FB", colorTo: "#248BD6" },
        title: "1 year",
        text: `Daily Signals from our Robots
            Telegram public channel
            Instagram public page`,
        price: "29,9",
        savePrice: "14,95",
        button: "Get started",
        buttonType: "outline-primary",
        href: "#"
    },
    {
        icon: planetYellow,
        iconColors: { colorFrom: "red", colorTo: "green" },
        title: "2 year",
        text: `Daily Signals from our Robots
            Telegram public channel`,
        price: "49,9",
        savePrice: "24,95",
        button: "Get started",
        buttonType: "outline-warn",
        href: "#"
    }
];
