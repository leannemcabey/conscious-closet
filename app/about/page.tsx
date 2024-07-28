import Layout from "@/app/components/Layout";
import BackButton from "@/app/components/navigation/BackButton";
import * as React from "react";
import AboutPageContainer from "@/app/components/about/AboutPageContainer";
import Image from "next/image";

export default async function About() {
    return (
        <Layout>
            <div className="h-full text-center mt-2.5">
                <BackButton/>

                <div className="h-[93%] flex flex-col">
                    <div className="flex flex-col space-y-1 justify-center items-center mb-4">
                        <Image
                            src={`/cc_icon_final_simple.svg`}
                            height="40"
                            width="40"
                            alt="conscious closet icon"
                        />
                        <h1 className="text-lg">about us</h1>
                    </div>
                    <AboutPageContainer />
                </div>
            </div>
        </Layout>
    )
}
