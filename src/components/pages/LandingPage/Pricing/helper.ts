import planetGrey from "assets/img/planets/planet-grey.png";
import planetGreen from "assets/img/planets/planet-green.png";
import planetSky from "assets/img/planets/planet-sky.png";

export const pricingContent = [
    {
        icon: planetGreen,
        iconColors: { colorFrom: "purple", colorTo: "pink" },
        title: "Free plan",
        text: `Manual trading
        Trading signals from our robots
        
        
        Unlimited signals
        Community Chat Support
        Web Community Chat Support
        `,
        price: "0",
        button: "Get started",
        buttonType: "",
        buttonBackgroundColor: "#0b98c5",
        borderColor: "#2c3454",
        href: "#"
    },
    {
        icon: planetSky,
        iconColors: { colorFrom: "#979797", colorTo: "#E5E5E5" },
        title: "Advanced plan",
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
        button: "Start\nfree trial",
        buttonType: "",
        buttonBackgroundColor: "#1ca46b",
        borderColor: "#0b98c5",
        href: "#",
        highlite: true
    },
    {
        icon: planetGrey,
        iconColors: { colorFrom: "#74C2FB", colorTo: "#248BD6" },
        title: "The investor plan",
        text: `Portfolio management


        Cryptuoso will automatically
        allocate assets between the robots`,
        price: "",
        savePrice: "",
        button: "Coming\nsoon",
        buttonType: "",
        buttonBackgroundColor: "rgba(105, 135, 185, 0.2)",
        borderColor: "#0b98c5",
        href: ""
    }
];
