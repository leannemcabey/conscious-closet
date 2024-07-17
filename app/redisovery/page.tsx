import * as React from "react";
import Layout from "@/app/components/Layout";
import Image from "next/image";
import BackButton from "@/app/components/navigation/BackButton";
import { getLeastWornArticles } from "@/app/server-actions/article/getLeastWornArticles";
import RediscoveryContainer from "@/app/components/articles/RediscoveryContainer";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";

export default async function Rediscovery() {
    const {articles, error } = await getLeastWornArticles();

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    return (
        <Layout>
            <BackButton />

            {error && <ErrorPageContainer errorMessage={errorMessage} />}

            {articles && (
                <div className="mt-2.5">
                    <div className="flex justify-center">
                        <h1 className="text-2xl mb-2.5 mr-2">rediscovery</h1>
                        <div>
                            <Image
                                src={"/lightbulb.svg"}
                                alt={"light bulb icon"}
                                width="30"
                                height="30"
                            />
                        </div>
                    </div>

                    <div className="mt-2 mb-6 text-center">
                        <p className="text-xl mb-2 text-theme-blue">
                            Rediscover your forgotten clothes!
                        </p>
                        <p>
                            We noticed you haven't worn these items in the last 6 months.
                            By rediscovering what you already own, you'll feel less compelled to purchase more.
                        </p>
                    </div>

                    <RediscoveryContainer articles={articles}/>
                </div>
            )}
        </Layout>
    )
};