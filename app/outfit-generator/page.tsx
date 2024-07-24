'use server'
import Layout from "@/app/components/Layout";
import OutfitGeneratorContainer from "@/app/components/outfitGenerator/OutfitGeneratorContainer";
import BackButton from "@/app/components/navigation/BackButton";

export default async function OutfitGenerator() {
    return (
        <Layout>
            <BackButton />
            <OutfitGeneratorContainer />
        </Layout>
    )
}