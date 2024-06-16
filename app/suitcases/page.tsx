'use server'
import Layout from "@/app/components/Layout";
import NewSuitcaseButton from "@/app/components/suitcases/NewSuitcaseButton";
import SuitcaseList from "@/app/components/suitcases/SuitcaseList";

export default async function Suitcases() {
    return (
        <Layout>
            <NewSuitcaseButton />
            <SuitcaseList />
        </Layout>
    )
};