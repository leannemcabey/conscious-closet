import { CapsuleElementsMapType } from "@/types/CapsuleElementsMapType";

const getDefaultCapsuleElements = (): CapsuleElementsMapType => {
    const defaultCapsuleElements: CapsuleElementsMapType = new Map();
    defaultCapsuleElements.set(0, { slot: 0, article: undefined })
    defaultCapsuleElements.set(1, { slot: 1, article: undefined })
    defaultCapsuleElements.set(2, { slot: 2, article: undefined })
    defaultCapsuleElements.set(3, { slot: 3, article: undefined })
    defaultCapsuleElements.set(4, { slot: 4, article: undefined })
    defaultCapsuleElements.set(5, { slot: 5, article: undefined })

    return defaultCapsuleElements;
};

export const defaultCapsuleElements: CapsuleElementsMapType = getDefaultCapsuleElements();

