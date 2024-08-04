import Layout from "@/app/components/Layout";
import BackButton from "@/app/components/buttons/BackButton";
import * as React from "react";
import AboutPageContainer from "@/app/components/about/AboutPageContainer";
import Image from "next/image";
import PageHeader from "@/app/components/PageHeader";

export default async function About() {
    return (
        <Layout>
            <div className="h-full mt-2.5">
                <BackButton/>

                <div className="h-[93%] flex flex-col">
                    <div className="flex flex-col space-y-1 justify-center items-center mb-4">
                        <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]">
                            <Image
                                src={`/cc_icon_final_simple.svg`}
                                height="40"
                                width="40"
                                alt="conscious closet icon"
                                className="w-full"
                            />
                        </div>
                        <h1 className="text-lg tracking-widest md:text-3xl">about us</h1>
                    </div>
                    <AboutPageContainer />
                </div>
            </div>
        </Layout>
    )
}
