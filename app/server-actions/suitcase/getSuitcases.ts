'use server'
import { createClient } from "@/utils/supabase/server";
import { orderByNewestCreated } from "@/utils/orderByNewestCreated";
import { toSuitcase } from "@/utils/typeConversions/toSuitcase";

export async function getSuitcases() {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("suitcases")
        .select()

    if (error) {
        console.log(error)
        throw error
    }

    const suitcases = data?.map((suitcase) => toSuitcase(suitcase)) || []
    return orderByNewestCreated(suitcases);
}