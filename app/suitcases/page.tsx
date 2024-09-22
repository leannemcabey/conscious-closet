import Layout from "@/app/components/Layout";
import SuitcaseList from "@/app/components/suitcases/SuitcaseList";
import PageHeader from "@/app/components/PageHeader";

// This forces the PWA to load this page dynamically. Without doing this, I believe the build was breaking.
export const dynamic = 'force-dynamic';

export default async function Suitcases() {
    return (
        <Layout>
            <div className="page-container">
                <PageHeader title="suitcases" iconPath="/suitcase.svg" iconAlt="suitcase icon"/>
                <SuitcaseList/>
            </div>
        </Layout>
    )
};