import { Article } from "@/types/article";

export interface CapsuleElementType {
    slot: number,
    article: Article | undefined
}

/*
* number represents the "slot" for that capsule element, which is also represented in the
* CapsuleElementType for visibility purposes
*/
export type CapsuleElementsMapType = Map<number, CapsuleElementType>;