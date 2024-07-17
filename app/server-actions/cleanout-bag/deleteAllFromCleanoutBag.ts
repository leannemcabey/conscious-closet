'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import {ArticleCategoryEnum} from "@/types/enums/articleCategoryEnum";

export async function deleteAllFromCleanoutBag() {
    const supabase = createClient();

    const { error } = await supabase
        .from('articles')
        .delete()
        .eq('in_cleanout_bag', true)

    if (error) {
        console.log(error)
        throw error
    }

    revalidatePath('/cleanout')
    Object.values(ArticleCategoryEnum).forEach((category) => revalidatePath(`articles/${category}`))
}