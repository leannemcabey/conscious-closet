'use client'

import Image from "next/image";
import GoogleSignIn from "@/app/components/auth/GoogleSignIn";
import {defaultUrl} from "@/constants/defaultUrl";
import * as React from "react";
import {useEffect, useState} from "react";
import DownloadTheApp from "@/app/components/landing/DownloadTheApp";

const LandingPageContainer = () => {
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

    return (
        <div className="flex flex-col items-center self-center absolute space-y-8 pb-36">
            <Image src="/cc_full.svg" width="350" height="200" alt="Conscious Closet"/>
            {isPWA && <GoogleSignIn defaultUrl={defaultUrl}/>}
            {isNotPWA && <DownloadTheApp />}
        </div>
    )
}

export default LandingPageContainer;