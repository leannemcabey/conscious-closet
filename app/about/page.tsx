import Layout from "@/app/components/Layout";
import BackButton from "@/app/components/navigation/BackButton";
import * as React from "react";
import AboutPageContainer from "@/app/components/about/AboutPageContainer";

export default async function About() {
    return (
        <Layout>
            <div className="h-full text-center mt-2.5">
                <BackButton/>

                <div className="h-full flex flex-col">
                    <h1 className="text-2xl mb-8 mr-2">about us</h1>
                    <AboutPageContainer />
                </div>
            </div>
        </Layout>
    )
}
