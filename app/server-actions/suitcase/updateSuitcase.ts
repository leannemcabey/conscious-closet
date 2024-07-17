'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {revalidatePath} from "next/cache";

export async function updateSuitcase(id: string, name: string) {
    const supabase = createClient();

    const { error } = await supabase
        .from('suitcases')
        .update({name: name})
        .eq('id', id)

    if (error) {
        console.log(error)
        throw error
    }

    revalidatePath(`/suitcases/${id}`)
}