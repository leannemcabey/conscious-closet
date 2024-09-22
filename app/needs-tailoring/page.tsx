import * as React from "react";
import Layout from "@/app/components/Layout";
import { getArticlesNeedingTailoring } from "@/app/server-actions/needs-tailoring/getArticlesNeedingTailoring";
import NeedsTailoringContainer from "@/app/components/needsTailoring/NeedsTailoringContainer";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import PageHeader from "@/app/components/PageHeader";
import { categorySlugToTitleMap } from "@/types/enums/articleCategoryEnum";
import CategoryPageContainer from "@/app/components/articles/CategoryPageContainer";
import PageHeaderWithSubHeader from "@/app/components/PageHeaderWithSubHeader";

export default async function NeedsTailoring() {
    const { articles, error } = await getArticlesNeedingTailoring();

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    return (
        <Layout>
            <div className="page-container">
                {error && <ErrorPageContainer errorMessage={errorMessage}/>}

                {articles && (
                    <>
                        <PageHeaderWithSubHeader title="needs tailoring" iconPath="/sewing-machine.svg" iconAlt="needle icon">
                            <>Tailoring is a great way to give new life to an item and avoid creating waste.</>
                        </PageHeaderWithSubHeader>

                        <NeedsTailoringContainer articles={articles}/>
                    </>
                )}
            </div>
        </Layout>
    )
};