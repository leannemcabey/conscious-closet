'use client'
import Modal from "@/app/components/modal/Modal";
import SuitcaseOptions from "@/app/components/suitcases/SuitcaseOptions";
import {Dispatch, SetStateAction, useRef} from "react";
import { Article } from "@/types/Article";
import { Suitcase } from "@/types/Suitcase";
import NewSuitcaseButton from "@/app/components/suitcases/NewSuitcaseButton";

interface AddArticleToSuitcaseModalProps {
    setIsSelectingSuitcase: Dispatch<SetStateAction<boolean>>;
    setCreatingSuitcase: Dispatch<SetStateAction<boolean>>;
    article: Article;
    suitcases: Suitcase[];
    unsavedSuitcaseSelections: string[];
    setUnsavedSuitcaseSelections: Dispatch<SetStateAction<string[] | undefined>>
    setSuitcases: Dispatch<SetStateAction<Suitcase[] | undefined>>
    handleSubmit: () => void;
}

const AddArticleToSuitcaseModal = ({
   setIsSelectingSuitcase,
   setCreatingSuitcase,
   suitcases,
   unsavedSuitcaseSelections,
   setUnsavedSuitcaseSelections,
   handleSubmit,
   setSuitcases
}: AddArticleToSuitcaseModalProps) => {
    const openNewSuitcaseModal = () => {
        // The setTimeout is used because the outsideClickHandler / eventListener inside the Modal
        // component conflicts with the action of opening the new modal. They essentially cancel each
        // other out. I believe the new modal tries to render and then closes very quickly. With this
        // timeout, we can avoid the two things conflicting with each other.
        setTimeout(() => setCreatingSuitcase(true), 150);
    }

    return (
        <Modal setIsOpen={setIsSelectingSuitcase}>
            <button
                onClick={() => handleSubmit()}
                className="fixed top-4 right-4 bg-theme-blue text-white self-end px-2 py-1 rounded-md drop-shadow"
            >
                Save
            </button>

            <p className="text-xl mb-4 font-semibold">Select suitcase(s):</p>

            <NewSuitcaseButton handleClick={() => openNewSuitcaseModal()}/>

            <SuitcaseOptions
                setSelectingSuitcase={setIsSelectingSuitcase}
                setCreatingSuitcase={setCreatingSuitcase}
                suitcases={suitcases}
                setSuitcases={setSuitcases}
                selectedSuitcases={unsavedSuitcaseSelections || []}
                setSelectedSuitcases={setUnsavedSuitcaseSelections}
            />
        </Modal>
    )
}

export default AddArticleToSuitcaseModal;