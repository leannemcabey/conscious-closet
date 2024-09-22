import * as React from "react";
import Layout from "@/app/components/Layout";
import { getLeastWornArticles } from "@/app/server-actions/article/getLeastWornArticles";
import RediscoveryContainer from "@/app/components/articles/RediscoveryContainer";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import PageHeader from "@/app/components/PageHeader";
import PageHeaderWithSubHeader from "@/app/components/PageHeaderWithSubHeader";

export default async function Rediscovery() {
    const {articles, error } = await getLeastWornArticles();

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    return (
        <Layout>
            <div className="page-container">
                {error && <ErrorPageContainer errorMessage={errorMessage}/>}

                {articles && (
                    <>
                        <PageHeaderWithSubHeader title="rediscovery" iconPath="/lightbulb.svg" iconAlt="light bulb icon">
                            <>
                                Rediscover what you haven't worn in the last 6 months.
                            </>
                        </PageHeaderWithSubHeader>

                        <RediscoveryContainer articles={articles}/>
                    </>
                )}
            </div>
        </Layout>
    )
};