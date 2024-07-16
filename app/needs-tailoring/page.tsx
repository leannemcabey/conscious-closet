import * as React from "react";
import Layout from "@/app/components/Layout";
import Image from "next/image";
import BackButton from "@/app/components/navigation/BackButton";
import {getArticlesNeedingTailoring} from "@/app/server-actions/needs-tailoring/getArticlesNeedingTailoring";
import NeedsTailoringContainer from "@/app/components/needsTailoring/NeedsTailoringContainer";

export default async function NeedsTailoring() {
    const articles = await getArticlesNeedingTailoring();

    return (
        <Layout>
            <BackButton />
            <div className="mt-4">
                <div className="flex justify-center">
                    <h1 className="text-2xl mb-4 mr-2">needs tailoring</h1>
                    <div>
                        <Image
                            src={"/needle.svg"}
                            alt={"needle icon"}
                            width="30"
                            height="30"
                        />
                    </div>
                </div>

                <div className="mt-2 mb-6 text-center">
                    <p>
                        Often times we don't wear certain clothes because they just don't fit us right.
                        Tailoring is a great way to give new life to an item and avoid creating waste!
                    </p>
                </div>

                <NeedsTailoringContainer articles={articles}/>
            </div>
        </Layout>
    )
};