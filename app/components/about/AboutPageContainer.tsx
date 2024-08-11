import * as React from "react";
import AboutSection from "@/app/components/about/AboutSection";
import Link from "next/link";
import Image from "next/image";

const AboutPageContainer = () => {
    return (
        <div className="flex flex-col place-content-between h-full overflow-scroll">
            <div className="flex justify-center">
                <p className="text-center text-base mb-6 max-w-[450px] md:text-xl md:max-w-[550px]">
                    Conscious Closet is a female-founded and owned wardrobe sustainability tool with three
                    primary philosophies.
                </p>
            </div>

            <div className="flex justify-center space-x-2">
                <AboutSection sectionName="shop your own closet" iconPath="/circle-1.svg" iconAlt="1">
                    <>
                        <p>
                            How many times have you rediscovered an item of clothing that you completely forgot you had?
                            And in the time you forgot, you went and bought three more things of the same style.
                        </p>
                        <p>
                            Digitally cataloguing your wardrobe can help you maintain an understanding of what you own,
                            and makes it easier for you to give each piece its day in the sun. It also makes packing a
                            heck of a lot easier!
                        </p>
                    </>
                </AboutSection>

                <AboutSection sectionName="less is more" iconPath="/circle-2.svg" iconAlt="2">
                    <>
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
                    </>
                </AboutSection>

                <AboutSection sectionName="clothes aren't trash" iconPath="/circle-3.svg" iconAlt="3">
                    <>
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
                    </>
                </AboutSection>
            </div>

            <h3 className="mt-8 pt-8 mb-4 text-center border border-dotted border-theme-green border-t-2 border-b-0 border-r-0 border-l-0 tracking-widest text-base md:text-2xl text-text-green">
                meet the founder
            </h3>
            <div className="md:text-xl mb-12">
                <div className="w-[180px] md:w-[300px] float-left mr-4 md:mr-6">
                    <Image
                        src="/founder.jpg"
                        alt="woman standing in front of a pink door wearing a houndstooth coat and high heeled boots"
                        width="180"
                        height="250"
                        className="w-full"
                    />
                </div>
                <p className="mb-4">I'm Leanne -- founder and engineer behind Conscious Closet!</p>
                <p className="mb-4">
                    I've always loved the art of fashion. It's such a unique form of creativity and self-expression.
                    An outfit can truly make or break my day. Over the last few years, though, I've learned that
                    the fashion industry is not nearly as glamorous as it seems. Everything from our purchasing habits
                    to how we launder our clothes have the potential to make a hugely negative impact on our earth.
                </p>
                <p className="mb-4">
                    So I built Conscious Closet because I wanted a tool that would help me and others on the journey to
                    a more sustainable wardrobe. That journey is, of course, much bigger than any one app could ever hope to
                    address. But I knew I could influence some tangible, everyday changes in perspective and action.
                </p>
                <p>
                    It's impossible to be perfectly sustainable -- everything has its trade offs. But the most
                    sustainable wardrobe you can have is the one that's already in your closet. My hope is that
                    Conscious Closet inspires you to rediscover what you already own, be thoughtful about purchasing
                    new things, and clean out your closet in a way that doesn't hurt the earth. ♡
                </p>
            </div>

            <div className="flex justify-center items-center bg-white rounded-lg p-2 space-x-4 place-content-center">
                <div className="w-[40px]">
                    <Image
                        src="/mail.svg"
                        alt="mail icon"
                        width="40"
                        height="40"
                        className="w-full"
                    />
                </div>
                <p className="w-[200px] md:w-max md:text-xl">
                    Have feedback? Email us at
                    <a
                        className="text-theme-blue"
                        href="mailto:leanne@consciouscloset.co"> leanne@consciouscloset.co</a>!
                </p>
            </div>
        </div>
    )
}

export default AboutPageContainer;