'use client'
import Image from "next/image";
import GoogleSignIn from "@/app/components/auth/GoogleSignIn";
import {defaultUrl} from "@/constants/defaultUrl";
import * as React from "react";
import {useEffect, useState} from "react";
import DownloadTheApp from "@/app/components/landing/DownloadTheApp";
import useNetworkStatus from "@/app/customHooks/useNetworkStatus";
import OfflineContainer from "@/app/components/OfflineContainer";

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
            <div className="flex justify-center min-h-screen max-h-screen relative">
                <Image priority src="/pexels-liza-summer-closet.jpg" fill style={{opacity: 0.2}}
                       alt="Photo of clothing on hangers by Liza Summer from Pexels"/>
                <div className="flex flex-col items-center self-center absolute space-y-8 pb-36">
                    <Image src="/cc_full.svg" width="350" height="200" alt="Conscious Closet"/>
                    {isPWA && <GoogleSignIn defaultUrl={defaultUrl}/>}
                    {isNotPWA && <DownloadTheApp/>}
                </div>
            </div>
        )
    } else {
        return <OfflineContainer />
    }
}

export default LandingPageContainer;