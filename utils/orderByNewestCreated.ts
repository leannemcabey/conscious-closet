export const orderByNewestCreated = (list: any[]) => {
    return list.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1)
}