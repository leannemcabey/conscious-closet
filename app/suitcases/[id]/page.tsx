'use server'
import Layout from "@/app/components/Layout";
import { Suitcase } from "@/types/suitcase";
import { toSuitcase } from "@/utils/typeConversions/toSuitcase";
import Image from "next/image";
import BackButton from "@/app/components/navigation/BackButton";
import { getSuitcaseArticles } from "@/app/server-actions/suitcase/getSuitcaseArticles";
import EditSuitcaseButton from "@/app/components/suitcases/EditSuitcaseButton";
import DeleteSuitcaseButton from "@/app/components/suitcases/DeleteSuitcaseButton";
import SuitcaseContainer from "@/app/components/suitcases/SuitcaseContainer";
import { getSuitcase } from "@/app/server-actions/suitcase/getSuitcase";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";

export default async function Suitcase({ params }: { id: string }) {
    const { suitcase, error: suitcaseError } = await getSuitcase(params.id);
    const { articles, error: articlesError } = await getSuitcaseArticles(params.id)

    const errorMessage = "An error occurred while fetching your suitcase. Please go back and try again."

    return (
        <Layout>
            {suitcaseError || articlesError && (
                <>
                    <BackButton />
                    <ErrorPageContainer errorMessage={errorMessage} />
                </>
            )}

            {suitcase && articles && (
                <>
                    <div className="flex place-content-between">
                        <BackButton />
                        <div className="h-max flex space-x-2">
                            <EditSuitcaseButton suitcase={suitcase!!}/>
                            <DeleteSuitcaseButton suitcaseId={params.id}/>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <h1 className="text-lg mb-4 mr-2">{suitcase!!.name}</h1>
                        <div>
                            <Image
                                src={"/suitcase.svg"}
                                alt={"suitcase icon"}
                                width="25"
                                height="25"
                            />
                        </div>
                    </div>
                    <SuitcaseContainer articles={articles}/>
                </>
            )}
        </Layout>
    )
};