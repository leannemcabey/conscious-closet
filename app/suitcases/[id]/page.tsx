'use server'
import Layout from "@/app/components/Layout";
import BackButton from "@/app/components/buttons/BackButton";
import { getSuitcaseArticles } from "@/app/server-actions/suitcase/getSuitcaseArticles";
import EditSuitcaseButton from "@/app/components/suitcases/EditSuitcaseButton";
import DeleteSuitcaseButton from "@/app/components/suitcases/DeleteSuitcaseButton";
import SuitcaseContainer from "@/app/components/suitcases/SuitcaseContainer";
import { getSuitcase } from "@/app/server-actions/suitcase/getSuitcase";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import PageHeader from "@/app/components/PageHeader";

export default async function Suitcase({ params }: { params: { id: string }}) {
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
                        <div className="h-max flex space-x-2 md:mt-4">
                            <EditSuitcaseButton suitcase={suitcase}/>
                            <DeleteSuitcaseButton suitcaseId={params.id}/>
                        </div>
                    </div>
                    <div className="mt-4">
                        <PageHeader title={suitcase.name} iconPath="/suitcase.svg" iconAlt="suitcase icon" />
                    </div>
                    <SuitcaseContainer articles={articles}/>
                </>
            )}
        </Layout>
    )
};