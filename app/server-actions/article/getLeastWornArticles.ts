'use server'
import { createClient } from "@/utils/supabase/server";
import {toArticle} from "@/utils/typeConversions/toArticle";

const getSixMonthsAgo = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear(), d.getMonth() - 6);
    return d.toISOString().split("T")[0]
}

export async function getLeastWornArticles() {
    const supabase = createClient();

    const sixMonthsAgo = getSixMonthsAgo();

    const { data, error } = await supabase
        .from("articles")
        .select()
        .or(`last_worn.lte.${sixMonthsAgo},last_worn.is.null`)

    if (error) {
        console.log(error)
        return
    }

    return data?.map((article) => toArticle(article)) ?? [];
}