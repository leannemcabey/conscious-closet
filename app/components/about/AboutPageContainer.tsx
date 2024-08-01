import * as React from "react";
import AboutSection from "@/app/components/about/AboutSection";
import Link from "next/link";

const AboutPageContainer = () => {
    return (
        <div className="h-[87%] mb-8">
            <div className="flex justify-center">
                <p className="text-base mb-6 max-w-[450px] md:text-lg md:max-w-[500px]">
                    Conscious Closet is a female-founded and owned wardrobe sustainability tool with three
                    primary philosophies.
                </p>
            </div>

            <div className="h-[87%] md:h-[90%] overflow-scroll pb-4">
                <AboutSection sectionName="Shop your own closet">
                    <p>
                        How many times have you rediscovered an item of clothing that you completely forgot you had?
                        And in the time you forgot, you went and bought three more things of the same style.
                        Digitally cataloguing your wardrobe can help you maintain an understanding of what you own,
                        and makes it easier for you to give each piece its day in the sun. It also makes packing a
                        heck of a lot easier!
                    </p>
                </AboutSection>

                <AboutSection sectionName="Less is more">
                    <p>
                        On average, an item of clothing is worn just 7 times before it's thrown out. 7 times!
                        We only have so many days in the year to actually wear our clothes, and even less if you only
                        count the days we plan to leave the house. So why do we have so many?
                    </p>
                    <p>
                        The problem is overconsumption. The world is constantly telling that us we need new and more
                        clothes. But having too many things in our closet actually makes it more difficult to choose what
                        to wear (ever heard of decision fatigue?). And when we have trouble choosing, we think we need
                        to buy more. And the vicious cycle continues.
                    </p>
                    <p>
                        Keeping track of your wardrobe can help prevent you from over-purchasing. And having the data
                        to see which items you never wear can help you make informed decisions on what to part with.
                    </p>
                </AboutSection>

                <AboutSection sectionName="Clothes aren't trash">
                    <p>
                        Don't throw those items you never wear in the trash! The world produces an estimated 92 million
                        tons of textile waste each year. You can avoid contributing to that by finding an alternative
                        way to clean out your closet.
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