'use server'
import Layout from "@/app/components/Layout";
import { createClient } from "@/utils/supabase/server";
import { Suitcase } from "@/types/Suitcase";
import { toSuitcase } from "@/utils/conversions/toSuitcase";

export default async function Suitcase({ params }: { id: string }) {
    const supabase = createClient();

    const { data: suitcases } = await supabase.from("suitcases").select().eq('id', params.id);
    // Converts the suitcase to non-db Suitcase type
    const mappedSuitcase: Suitcase | undefined = suitcases?.map((suitcase) => toSuitcase(suitcase))[0]


    return (
        <Layout>
            <p>{mappedSuitcase?.name}</p>
        </Layout>
    )
};