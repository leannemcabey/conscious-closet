import axios from "axios";

export const getMediaItems = () => {
    axios.get("https://photoslibrary.googleapis.com/v1/mediaItems", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + providerToken
        },
        params: {
            pageSize: "25"
        }
    })
        .then((response) => {
            const data = response.data.mediaItems.map((item: any) => {
                return {
                    baseUrl: item.baseUrl,
                    imageId: item.id
                }
            })
}