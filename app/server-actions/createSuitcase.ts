'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createSuitcase(name: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('suitcases')
        .insert([
            {
                name: name
            }
        ])

    if (error) {
        console.log(error)
        return
    }

    // TODO: redirect to previous page, because this can now be reached from the article page as well
    redirect(`/suitcases`)
}