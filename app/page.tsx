'use server'
import Image from 'next/image'
import * as React from "react";
import LandingPageContainer from "@/app/components/landing/LandingPageContainer";

export default async function Index() {
    return (
        <div>
            <div className="flex justify-center min-h-screen max-h-screen relative">
                <Image priority src="/pexels-liza-summer-closet.jpg" fill style={{opacity: 0.2}}
                       alt="Photo of clothing on hangers by Liza Summer from Pexels"/>
                <LandingPageContainer />
            </div>
        </div>
    );
};
