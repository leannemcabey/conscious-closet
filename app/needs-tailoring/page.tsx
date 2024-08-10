import * as React from "react";
import Layout from "@/app/components/Layout";
import Image from "next/image";
import BackButton from "@/app/components/buttons/BackButton";
import { getArticlesNeedingTailoring } from "@/app/server-actions/needs-tailoring/getArticlesNeedingTailoring";
import NeedsTailoringContainer from "@/app/components/needsTailoring/NeedsTailoringContainer";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import PageHeader from "@/app/components/PageHeader";

export default async function NeedsTailoring() {
    const { articles, error } = await getArticlesNeedingTailoring();

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    return (
        <Layout>
            <>
                <BackButton />

                {error && <ErrorPageContainer errorMessage={errorMessage} />}

                {articles && (
                    <div className="mt-4 h-[93%]">
                        <div className="flex flex-col items-center">
                            <PageHeader title="needs tailoring" iconPath="/sewing-machine.svg" iconAlt="needle icon" />

                            <p className="mb-1 text-center max-w-[300px] text-neutral-400 text-sm md:text-lg md:max-w-[400px]">
                                Tailoring is a great way to give new life to an item and avoid creating waste.
                            </p>
                        </div>

                        <NeedsTailoringContainer articles={articles}/>
                    </div>
                )}
            </>
        </Layout>
    )
};