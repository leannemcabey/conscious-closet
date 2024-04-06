'use client'
import { Article } from "@/types/Article";
import ArticleImageLink from "@/app/components/articles/ArticleImageLink";
import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";
import {GooglePhotoMetadata} from "@/types/GooglePhotoMetadata";
import axios from "axios";
import articleImage from "@/app/components/articles/ArticleImage";

interface ArticlesContainerProps {
    articles: Article[];
}

const ArticlesContainer = ({ articles }: ArticlesContainerProps) => {
    const supabase = createClient();
    const [refreshedArticles, setRefreshedArticles] = useState<Article[]>();
    // const [googlePhotos, setGooglePhotos] = useState<GooglePhotoMetadata[]>();

    const externalPhotoIds = articles.map((article) => article.image.imageId);

    useEffect(() => {
        if(articles.length > 0) {
            supabase.auth.getSession()
                .then((session) => {
                    const providerToken = session.data.session?.provider_token;
                    const params = new URLSearchParams();
                    externalPhotoIds.forEach((id) => params.append("mediaItemIds", id))

                    axios.get(`https://photoslibrary.googleapis.com/v1/mediaItems:batchGet`, {
                        params: params,
                        //     {
                        //     mediaItemsIds: testingParams
                        //     // mediaItemIds: externalPhotoIds.map((value, index) => `arr[${index}]=${value}`).join('&')
                        //     // mediaItemIds: externalPhotoIds
                        // },
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + providerToken
                        }
                    })
                        .then((response) => {
                            console.log(`batch response: ${JSON.stringify(response)}`)
                            const data = response.data.mediaItemResults.map((result) => {
                                console.log(`result: ${JSON.stringify(result.mediaItem.baseUrl)}`)
                                return {
                                    baseUrl: result.mediaItem.baseUrl,
                                    imageId: result.mediaItem.id
                                }
                            })

                            const withUpdatedGoogleData: Article[] = articles.map((article) => {
                                const updatedGooglePhotoMetadata: GooglePhotoMetadata = data.find((photo) => photo.imageId === article.image.imageId) ?? article.image

                                return {
                                    ...article,
                                    image: {...updatedGooglePhotoMetadata}
                                }
                            })

                            setRefreshedArticles(withUpdatedGoogleData)
                        })
                })
        }
    }, []);


    return (
        <div className="grid grid-cols-3">
            {refreshedArticles?.map((article) => (
                <ArticleImageLink article={article} key={article.id}/>
            ))}
        </div>
    )
}

export default ArticlesContainer;