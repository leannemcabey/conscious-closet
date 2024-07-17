'use server'
import { createClient } from "@/utils/supabase/server";
import {toSuitcase} from "@/utils/typeConversions/toSuitcase";

export async function getSuitcase(suitcaseId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("suitcases")
        .select()
        .eq('id', suitcaseId)

    return {
        suitcase: data?.map((suitcase) => toSuitcase(suitcase))[0],
        error: error
    }
}