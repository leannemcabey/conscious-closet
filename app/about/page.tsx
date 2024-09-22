import Layout from "@/app/components/Layout";
import * as React from "react";
import AboutPageContainer from "@/app/components/about/AboutPageContainer";
import Image from "next/image";

// This forces the PWA to load this page dynamically. Without doing this, I believe the build was breaking.
export const dynamic = 'force-dynamic';

export default async function About() {
    return (
        <Layout>
            <div className="h-full flex flex-col pb-2 mt-2.5 md:mt-4">
                <div className="flex flex-col space-y-1 justify-center items-center mb-2">
                    <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]">
                        <Image
                            src={`/conscious-closet-logo.svg`}
                            height="40"
                            width="40"
                            alt="conscious closet logo"
                            className="w-full"
                        />
                    </div>
                    <h1 className="tracking-widest text-lg md:text-xl">about us</h1>
                </div>

                <AboutPageContainer />
            </div>
        </Layout>
    )
}
