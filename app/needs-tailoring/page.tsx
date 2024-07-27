import * as React from "react";
import Layout from "@/app/components/Layout";
import Image from "next/image";
import BackButton from "@/app/components/navigation/BackButton";
import { getArticlesNeedingTailoring } from "@/app/server-actions/needs-tailoring/getArticlesNeedingTailoring";
import NeedsTailoringContainer from "@/app/components/needsTailoring/NeedsTailoringContainer";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";

export default async function NeedsTailoring() {
    const { articles, error } = await getArticlesNeedingTailoring();

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    return (
        <Layout>
            <BackButton />

            {error && <ErrorPageContainer errorMessage={errorMessage} />}

            {articles && (
                <div className="mt-4">
                    <div className="flex flex-col items-center">
                        <div className="flex">
                            <h1 className="text-lg mb-2 mr-2">needs tailoring</h1>
                            <div>
                                <Image
                                    src={"/needle.svg"}
                                    alt={"needle icon"}
                                    width="25"
                                    height="25"
                                />
                            </div>
                        </div>

                        <p className="mt-1 mb-6 text-center max-w-[300px] text-neutral-400 text-sm">
                            ⓘ Tailoring is a great way to give new life to an item and avoid creating waste
                        </p>
                    </div>

                    <NeedsTailoringContainer articles={articles}/>
                </div>
            )}
        </Layout>
    )
};