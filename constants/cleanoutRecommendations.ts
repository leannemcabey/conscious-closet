import { CleanoutRecommendation } from "@/types/cleanoutRecommendation";

export const cleanoutRecommendations: {
    recycling: CleanoutRecommendation[],
    donating: CleanoutRecommendation[],
    thrifting: CleanoutRecommendation[]
} = {
    recycling: [
        {
            name: "SuperCircle",
            url: "https://www.supercircle.world/",
            description: "SuperCircle promotes a circular economy by powering recycling for the world's leading brands. " +
                "Send your used items here and get store credit to some of your favorite sustainable stores. " +
                "HOT TIP: Many of the stores allow you to send items from any brand and still receive store credit!"
        },
        {
            name: "Trashie",
            url: "https://shop.trashie.io/products/take-back-bag",
            description: "Trashie diverts textile waste from landfills by taking your used clothes and finding them a new home. " +
                "You'll receive credit for each bag of clothes you send, which you can redeem for deals at your favorite brands."
        },
        {
            name: "Scrap NYC",
            url: "https://www.scrapnyc.com/give",
            description: "Scrap NYC ensures your used clothes don't end up in the landfill by donating, selling, " +
                "or recycling them based on their condition. (NYC only)"
        }
    ],
    donating: [
        {
            name: "Your local thrift store",
            description: "Support your community by calling your local thrift stores and see if they " +
                "accept clothing donations!"
        },
        {
            name: "Bottomless Closet",
            url: "https://bottomlesscloset.org/give-clothing-more/",
            description: "Bottomless Closet will take your used professional women's clothing and give them a " +
                "second life with women who are seeking employment. Help someone land a job by sending your gently worn" +
                " professional clothing here!"
        },
        {
            name: "That Suits You",
            url: "https://www.thatsuitsyou.org/donate",
            description: "That Suits You accepts gently worn professional men's attire and provides it to men seeking " +
                "work and high school seniors for graduation and prom."
        },
        {
            name: "100 Suits",
            url: "https://www.100suitsnyc.org/programs",
            description: "100 Suits empowers underserved and marginalized communities by providing professional attire, " +
                "workforce development, and community development programs. Send your gently worn men's professional " +
                "attire here for a second life. (NYC only)"
        },
    ],
    thrifting: [
        {
            name: "ThredUp",
            url: "https://www.thredup.com/cleanout",
            description: "ThredUp is an online marketplace specializing in secondhand clothing and accessories. " +
                "Make some money off your gently worn items and give them a second life by selling them here."
        }
    ]
}