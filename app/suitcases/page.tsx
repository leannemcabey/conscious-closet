'use server'
import Layout from "@/app/components/Layout";
import SuitcaseList from "@/app/components/suitcases/SuitcaseList";
import BackButton from "@/app/components/buttons/BackButton";
import PageHeader from "@/app/components/PageHeader";
import dynamic from 'next/dynamic'

const DynamicSuitcasePageContainer = dynamic(() => import('../components/suitcases/SuitcasesPageContainer'), {
    ssr: false,
})

export default async function Suitcases() {
    return (
        <Layout>
            <DynamicSuitcasePageContainer />
        </Layout>
    )
};