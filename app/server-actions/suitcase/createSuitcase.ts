'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {revalidatePath} from "next/cache";
import {toArticle} from "@/utils/conversions/toArticle";
import {toSuitcase} from "@/utils/conversions/toSuitcase";

export async function createSuitcase(name: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('suitcases')
        .insert([
            {
                name: name
            }
        ])
        .select()

    if (error) {
        console.log(error)
        return
    }

    revalidatePath(`/suitcases`)

    if (data) {
        return toSuitcase(data[0]);
    }
}