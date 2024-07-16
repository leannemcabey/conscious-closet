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

export default async function Suitcase({ params }: { id: string }) {
    const suitcases = await getSuitcase(params.id);
    // Converts the suitcase to non-db Suitcase type
    const mappedSuitcase: Suitcase | undefined = suitcases?.map((suitcase) => toSuitcase(suitcase))[0]

    const articles = await getSuitcaseArticles(params.id)

    if (mappedSuitcase) {
        return (
            <Layout>
                <div className="flex place-content-between">
                    <BackButton />
                    <div className="h-max flex space-x-2">
                        <EditSuitcaseButton suitcase={mappedSuitcase!!}/>
                        <DeleteSuitcaseButton suitcaseId={params.id}/>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <h1 className="text-2xl mb-8 mr-2">{mappedSuitcase!!.name}</h1>
                    <div>
                        <Image
                            src={"/suitcase.svg"}
                            alt={"suitcase icon"}
                            width="30"
                            height="30"
                        />
                    </div>
                </div>
                <SuitcaseContainer articles={articles}/>
            </Layout>
        )
    }
};