'use client'
import Image from "next/image";
import GoogleSignIn from "@/app/components/auth/GoogleSignIn";
import {defaultUrl} from "@/constants/defaultUrl";
import * as React from "react";
import {useEffect, useState} from "react";
import DownloadTheApp from "@/app/components/landing/DownloadTheApp";
import useNetworkStatus from "@/app/customHooks/useNetworkStatus";
import OfflineContainer from "@/app/components/OfflineContainer";
import InfoCard from "@/app/components/landing/InfoCard";

const LandingPageContainer = () => {
    const { isOnline } = useNetworkStatus();
    // Using two different state values so that we don't have to render one element and then replace it with
    // another when useEffect runs.
    const [isPWA, setIsPWA] = useState<boolean>();
    const [isNotPWA, setIsNotPWA] = useState<boolean>()

    useEffect(() => {
        // Have to do this because Typescript doesn't know about the `standalone` property being set by the PWA
        const windowNavigator = window.navigator as any;
        const isInPWA = () => (
                window.matchMedia('(display-mode: standalone)').matches)
            || (windowNavigator.standalone)
            || document.referrer.includes('android-app://');

        const result = isInPWA()
        setIsPWA(result)
        setIsNotPWA(!result)

    }, []);

    if (isOnline) {
        return (
            <div className="flex justify-center items-center text-center min-h-screen max-h-screen overflow-hidden relative">
                <Image priority src="/pexels-liza-summer-closet.jpg" fill style={{opacity: 0.2}}
                       alt="Photo of clothing on hangers by Liza Summer from Pexels"/>

                <div className="h-screen w-screen flex flex-col place-content-between items-center self-center py-4 absolute">
                    <div className="h-[93%] w-full mb-10 flex flex-col items-center self-center place-content-between">
                        <div className="flex flex-col items-center">
                            <div className="w-[350px] md:w-[450px]">
                                <Image
                                    src="/cc_full.svg"
                                    width="350"
                                    height="200"
                                    alt="Conscious Closet"
                                    className="w-full"
                                />
                            </div>
                            <p className="-mt-4 px-2 text-sm max-w-[330px] md:max-w-[450px] tracking-widest text-neutral-700 md:text-lg">
                                The most sustainable wardrobe you can have is the one already in your closet.
                            </p>
                        </div>

                        <div className="flex flex-col items-center self-center">
                            <div className="flex justify-center mt-4 mx-2 space-x-4 md:space-x-4 md:mt-10">
                                <div className="self-center pl-2 w-[40%] md:w-[30%] max-w-[250px] lg:max-w-[150px]">
                                    <Image
                                        src="/cc-home.svg"
                                        height="350"
                                        width="200"
                                        alt="Conscious Closet home page"
                                        className="w-full"
                                    />
                                </div>
                                <div className="pr-2 flex flex-col justify-center w-[60%] max-w-[350px] md:w-[70%] md:max-w-[500px] space-y-4 md:space-y-6">
                                    <InfoCard iconPath="/hanger.svg" iconAlt="hanger icon">
                                        <>
                                            <p className="tracking-wide text-theme-green font-bold">
                                                Inventory your closet
                                            </p>
                                            <p>
                                                Organize your clothing by category and weather.
                                            </p>
                                        </>
                                    </InfoCard>

                                    <InfoCard iconPath="/suitcase.svg" iconAlt="suitcase icon">
                                        <>
                                            <p className="tracking-wide text-theme-green font-bold">
                                                Seamlessly pack for trips
                                            </p>
                                            <p>
                                                Create suitcases for your upcoming trips and design capsule wardrobes.
                                            </p>
                                        </>
                                    </InfoCard>

                                    <InfoCard iconPath="/lightbulb.svg" iconAlt="lightbulb icon">
                                        <>
                                            <p className="tracking-wide text-theme-green font-bold">
                                                Gain insight into what you're not wearing
                                            </p>
                                            <p>
                                                Mark when you've worn something and easily view what you haven't worn in a while.
                                            </p>
                                        </>
                                    </InfoCard>
                                </div>
                            </div>
                        </div>

                        {isNotPWA && <DownloadTheApp />}
                        {isPWA && <GoogleSignIn defaultUrl={defaultUrl}/>}
                    </div>

                    <a href="/privacy-policy.html" className="md:text-xl lg:text-base">
                        Privacy Policy
                    </a>
                </div>
            </div>
        )
    } else {
        return <OfflineContainer />
    }
}

export default LandingPageContainer;