import * as React from "react";
import AboutSection from "@/app/components/about/AboutSection";
import Link from "next/link";

const AboutPageContainer = () => {
    return (
        <div className="h-full mb-8">
            <p className="text-lg mb-6">
                Conscious Closet is a female-founded and owned wardrobe sustainability tool with three
                primary philosophies.
            </p>

            <div className="h-3/4 overflow-scroll">
                <AboutSection sectionName="Know what you have & what you don't wear">
                    <p>
                        How many times have you rediscovered an item of clothing that you completely forgot you had?
                        And in the time you forgot, you went and bought three more things of the same style.
                        Digitally cataloguing your wardrobe can help you maintain an understanding of what you own,
                        and makes it easier for you to give each piece its day in the sun. It also makes packing a
                        heck of a lot easier!
                    </p>

                    <p>
                        As for knowing what you don't wear, we know for a lot of us it's hard to get rid of things.
                        What if one day I want to wear it? But having too many things in our closet actually makes
                        it more difficult to choose what to wear (ever heard of decision fatigue?). And when we have
                        trouble choosing, we think we need to buy more. So we have to simplify things by ridding our
                        closets of items we don't wear, and having the data to show you that you never wear an item can
                        help make that decision easier.
                    </p>
                </AboutSection>

                <AboutSection sectionName="Less is more">
                    <p>
                        On average, an item of clothing is worn just 7 times before it's thrown out! 7 times!
                        We only have so many days in the year to actually wear our clothes, and even less if you only
                        count the days we plan to leave the house (wink wink to our fellow introverts). So why do we
                        have so many?
                    </p>
                    <p>
                        It goes back to what we said before about decision fatigue when looking at our
                        closets. We buy more because we don't know what we have and in reality, we have too much.
                        Keeping track of your wardrobe can help prevent you from over-purchasing and repeating the
                        vicious decision fatigue cycle.
                    </p>
                </AboutSection>

                <AboutSection sectionName="Don't throw anything out">
                    <p>
                        Now we know we just told you to get rid of the things you don't wear. But don't throw them
                        in the trash! The world produces an estimated 92 million tons of textile waste each year.
                        You can avoid contributing to that by finding an alternative way to clean out your closet.
                    </p>
                    <p>
                        The first thing we recommend is asking yourself if the reason you don't wear an item is
                        because it just doesn't fit you right. If that's the case, try getting it tailored for a
                        perfect fit before giving up on it!
                    </p>
                    <p>
                        Second to tailoring, we recommend donating,
                        thrifting, or recycling your unwanted clothes. Check out our
                        <Link href="/cleanout/recommendations" className="text-theme-green"> cleanout recs </Link>
                        page for some suggestions on where to do this!
                    </p>
                </AboutSection>
            </div>
        </div>
    )
}

export default AboutPageContainer;