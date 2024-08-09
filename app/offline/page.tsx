import Image from 'next/image'
import * as React from "react";

export default async function Offline() {
    return (
        <div className="flex justify-center min-h-screen max-h-screen relative">
            <Image priority src="/pexels-liza-summer-closet.jpg" fill style={{opacity: 0.2}}
                   alt="Photo of clothing on hangers by Liza Summer from Pexels"/>
            <div className="w-[80%] flex flex-col items-center self-center text-center text-text-green">
                <div className="w-[200px] md:w-[350px]">
                    <Image src="/cry.svg" width="200" height="200" alt="sad" className="w-full"/>
                </div>
                <p className="mt-8 mb-2 text-3xl md:text-5xl md:mb-4">Sorry!</p>
                <p className="text-xl md:text-3xl">Conscious Closet is only available with an internet connection.</p>
            </div>
        </div>
    );
};
