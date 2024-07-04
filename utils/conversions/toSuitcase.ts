import { DBSuitcase, Suitcase } from "@/types/Suitcase";

export const toSuitcase = (dbSuitcase: DBSuitcase): Suitcase => {
    if (dbSuitcase) {
        return {
            id: dbSuitcase.id,
            createdAt: dbSuitcase.created_at,
            name: dbSuitcase.name
        } as Suitcase
    }
}