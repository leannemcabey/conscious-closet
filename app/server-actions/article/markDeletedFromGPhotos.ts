'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function markDeletedFromGPhotos(articleId: string) {
    const supabase = createClient();

    const { error } = await supabase
        .from('articles')
        .update({image_deleted_from_google_photos: true})
        .eq('id', articleId)

    if (error) {
        console.log(error)
        throw error
    }
}