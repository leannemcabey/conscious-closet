'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import {redirect} from "next/navigation";

export async function deleteSuitcase(id: string) {
    const supabase = createClient();

    const { error } = await supabase
        .from('suitcases')
        .delete()
        .eq('id', id)

    if (error) {
        console.log(error)
        throw error
    }

    revalidatePath('/suitcases')
}