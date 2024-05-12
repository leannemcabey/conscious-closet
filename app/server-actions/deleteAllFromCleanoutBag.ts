'use server'
import { createClient } from "@/utils/supabase/server";

export async function deleteAllFromCleanoutBag() {
    const supabase = createClient();

    const { error } = await supabase
        .from('articles')
        .delete()
        .eq('in_cleanout_bag', true)

    if (error) {
        console.log(error)
        return
    }
}