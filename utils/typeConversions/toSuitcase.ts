import { DBSuitcase, Suitcase } from "@/types/suitcase";

export const toSuitcase = (dbSuitcase: DBSuitcase): Suitcase => {
    return {
        id: dbSuitcase.id,
        createdAt: dbSuitcase.created_at,
        name: dbSuitcase.name
    } as Suitcase
}