'use server'
import { createClient } from "@/utils/supabase/server";

export async function getAllArticleExternalIds(): Promise<Set<string>> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('articles')
        .select('external_image_id')
        .eq('image_deleted_from_google_photos', false);

    return new Set(data?.map((result) => result.external_image_id) || []);
}