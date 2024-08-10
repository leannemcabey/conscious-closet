'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {revalidatePath} from "next/cache";
import {toArticle} from "@/utils/typeConversions/toArticle";
import {toSuitcase} from "@/utils/typeConversions/toSuitcase";
import {Suitcase} from "@/types/suitcase";

export async function createSuitcase(name: string): Promise<Suitcase> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('suitcases')
        .insert([{name: name}])
        .select()

    revalidatePath(`/suitcases`)

    if (data) {
        return toSuitcase(data[0]);
    } else {
        console.log(error)
        throw error
    }
}