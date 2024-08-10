'use server'
import Head from 'next/head'
import Image from 'next/image'
import GoogleSignIn from "@/app/components/auth/GoogleSignIn";
import * as React from "react";
import { defaultUrl } from "@/constants/defaultUrl";

export default async function Index() {
    console.log(`defaultUrl: ${defaultUrl}`)

    return (
        <div>
            <Head>
                <title>Conscious Closet</title>
                <link rel="manifest" href="/manifest.json" crossorigin="use-credentials"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
                <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,300;1,300&display=swap"
                      rel="stylesheet"/>
            </Head>

            <div className="flex justify-center min-h-screen max-h-screen relative">
                <Image priority src="/pexels-liza-summer-closet.jpg" fill style={{opacity: 0.2}}
                       alt="Photo of clothing on hangers by Liza Summer from Pexels"/>
                <div className="flex flex-col items-center self-center absolute space-y-8 pb-36">
                    <Image src="/cc_full.svg" width="350" height="200" alt="Conscious Closet"/>
                    <GoogleSignIn defaultUrl={defaultUrl}/>
                </div>
            </div>
        </div>
    );
};
