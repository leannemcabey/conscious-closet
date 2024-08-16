import Layout from "@/app/components/Layout";
import BackButton from "@/app/components/buttons/BackButton";
import * as React from "react";
import AboutPageContainer from "@/app/components/about/AboutPageContainer";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function About() {
    return (
        <Layout>
            <>
                <div className="h-full mt-2.5">
                    <BackButton/>

                    <div className="h-[93%] md:h-[90%] flex flex-col pb-2 lg:-mt-8">
                        <div className="flex flex-col space-y-1 justify-center items-center mb-4">
                            <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[40px] lg:h-[40px]">
                                <Image
                                    src={`/conscious-closet-logo.svg`}
                                    height="40"
                                    width="40"
                                    alt="conscious closet logo"
                                    className="w-full"
                                />
                            </div>
                            <h1 className="text-lg tracking-widest md:text-3xl lg:text-xl">about us</h1>
                        </div>
                        <AboutPageContainer />
                    </div>
                </div>
            </>
        </Layout>
    )
}
