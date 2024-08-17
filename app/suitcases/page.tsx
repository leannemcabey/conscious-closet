import Layout from "@/app/components/Layout";
import SuitcaseList from "@/app/components/suitcases/SuitcaseList";
import BackButton from "@/app/components/buttons/BackButton";
import PageHeader from "@/app/components/PageHeader";

export const dynamic = 'force-dynamic';

export default async function Suitcases() {

    return (
        <Layout>
            <>
                {/*<BackButton />*/}
                <div className="h-full mt-2 flex flex-col">
                    <PageHeader title="suitcases" iconPath="/suitcase.svg" iconAlt="suitcase icon" />
                    <SuitcaseList />
                </div>
            </>
        </Layout>
    )
};