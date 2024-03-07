import { createClient } from '@/utils/supabase/server';

export default async function ArticleTypes() {
    const supabase = createClient();
    const { data: articleTypes } = await supabase.from("article_types").select();

    console.log(JSON.stringify(articleTypes))

    return <pre>{JSON.stringify(articleTypes, null, 2)}</pre>
}