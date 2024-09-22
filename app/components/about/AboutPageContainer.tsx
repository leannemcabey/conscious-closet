import * as React from "react";
import AboutSection from "@/app/components/about/AboutSection";
import Link from "next/link";
import Image from "next/image";
import {
    founderP1, founderP2, founderP3, founderP4,
    lessIsMoreP1,
    lessIsMoreP2,
    lessIsMoreP3, notTrashP1, notTrashP2, notTrashP3, notTrashP4,
    shopYourOwnClosetP1,
    shopYourOwnClosetP2
} from "@/constants/aboutPageCopy";

const AboutPageContainer = () => {
    return (
        <div className="flex flex-col place-content-between h-full overflow-scroll pb-4">
            <div>
                <div className="flex justify-center">
                    <p className="text-center text-base mt-3 mb-2 max-w-[450px] md:text-xl md:max-w-[550px] lg:text-base">
                        Conscious Closet is a female-founded and owned wardrobe sustainability tool with three
                        primary philosophies.
                    </p>
                </div>

                <div className="flex justify-center space-x-2">
                    <AboutSection sectionName="shop your own closet" iconPath="/circle-1.svg" iconAlt="1">
                        <>
                            <p>{shopYourOwnClosetP1}</p>
                            <p>{shopYourOwnClosetP2}</p>
                        </>
                    </AboutSection>

                    <AboutSection sectionName="less is more" iconPath="/circle-2.svg" iconAlt="2">
                        <>
                            <p>{lessIsMoreP1}</p>
                            <p>{lessIsMoreP2}</p>
                            <p>{lessIsMoreP3}</p>
                        </>
                    </AboutSection>

                    <AboutSection sectionName="clothes aren't trash" iconPath="/circle-3.svg" iconAlt="3">
                        <>
                            <p>{notTrashP1}</p>
                            <p>{notTrashP2}</p>
                            <p>
                                {notTrashP3}
                                <Link href="/cleanout/recommendations" className="text-theme-green"> cleanout recs </Link>
                                {notTrashP4}
                            </p>
                        </>
                    </AboutSection>
                </div>
            </div>

            <div>
                <h3 className="mt-8 mb-4 text-center tracking-widest text-lg lg:mb-8 text-text-green">
                    meet the founder
                </h3>
                <div className="mb-4 lg:w-[70%] lg:self-center">
                    <div className="w-[180px] md:w-[300px] float-left mr-4 md:mr-6">
                        <Image
                            src="/founder.jpg"
                            alt="woman standing in front of a pink door wearing a houndstooth coat and high heeled boots"
                            width="600"
                            height="800"
                            className="w-full rounded-lg"
                        />
                    </div>
                    <p className="mb-4">{founderP1}</p>
                    <p className="mb-4">{founderP2}</p>
                    <p className="mb-4">{founderP3}</p>
                    <p>{founderP4}</p>
                </div>
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