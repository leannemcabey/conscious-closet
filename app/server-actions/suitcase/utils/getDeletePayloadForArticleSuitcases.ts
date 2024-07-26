export const getDeletePayloadForArticleSuitcases = (unsavedSuitcaseIds: string[], savedSuitcaseIds: string[]): string[] => {
    let deletePayload: string[] = [];

    // Any ids in `savedSuitcaseIds` that are not in `unsavedSuitcaseIds` needs to be deleted,
    // because it was deselected by the user.
    savedSuitcaseIds?.forEach((id) => {
        if (!unsavedSuitcaseIds.includes(id)) {
            deletePayload.push(id)
        }
    })

    return deletePayload;
};