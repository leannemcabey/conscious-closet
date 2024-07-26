interface insertPayloadType {
    article_id: string,
    suitcase_id: string
}

export const getInsertPayloadForArticleSuitcases = (articleId: string, unsavedSuitcaseIds: string[], savedSuitcaseIds: string[]): insertPayloadType[] => {
    let insertPayload: insertPayloadType[] = [];

    // `unsavedSuitcaseIds` will include those that have already been written to the database previously,
    // so they need to be de-duped. Otherwise, the entire database transaction will fail.
    // Find the new ids that haven't already been written to the database.
    unsavedSuitcaseIds.forEach((id) => {
        if (!savedSuitcaseIds?.includes(id)) {
            insertPayload.push({
                article_id: articleId,
                suitcase_id: id
            })
        }
    })

    return insertPayload;
};