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
            <div className="flex justify-center text-center min-h-screen max-h-screen relative">
                <Image priority src="/pexels-liza-summer-closet.jpg" fill style={{opacity: 0.2}}
                       alt="Photo of clothing on hangers by Liza Summer from Pexels"/>
                <div className="h-screen flex flex-col place-content-between items-center self-center py-4 absolute">
                    <Image src="/cc_full.svg" width="350" height="200" alt="Conscious Closet"/>

                    <p className="text-xl w-[85%] max-w-[600px] tracking-widest mb-4 md:text-3xl">
                        The most sustainable wardrobe you can have is the one already in your closet.
                    </p>

                    <div className="flex mx-2 space-x-4 w-[80%]">
                        <div className="w-[200px] h-max">
                            <Image
                                src="/cc-home.svg"
                                height="350"
                                width="200"
                                alt="Conscious Closet home page"
                                className="w-full rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col justify-center space-y-6">
                            <InfoCard iconPath="/hanger-white.svg" iconAlt="hanger icon" >
                                Inventory your closet
                            </InfoCard>

                            <InfoCard iconPath="/suitcase-white.svg" iconAlt="suitcase icon" >
                                Seamlessly pack for trips
                            </InfoCard>

                            <InfoCard iconPath="/lightbulb-white.svg" iconAlt="lightbulb icon" >
                                Gain insight into what you're not wearing
                            </InfoCard>
                        </div>
                    </div>

                    {isPWA && <GoogleSignIn defaultUrl={defaultUrl}/>}
                    {isNotPWA && <DownloadTheApp/>}

                    <a
                        href="/privacy-policy.html"
                        className="text-theme-green"
                    >
                        Privacy Policy
                    </a>
                </div>
            </div>
        )
    } else {
        return <OfflineContainer/>
    }
}

export default LandingPageContainer;