'use client'
import Modal from "@/app/components/modal/Modal";
import SuitcaseOptions from "@/app/components/suitcases/SuitcaseOptions";
import { Dispatch, SetStateAction } from "react";
import { Suitcase } from "@/types/suitcase";
import NewSuitcaseButton from "@/app/components/suitcases/NewSuitcaseButton";

interface AddArticleToSuitcaseModalProps {
    setIsSelectingSuitcase: Dispatch<SetStateAction<boolean>>;
    setCreatingSuitcase: Dispatch<SetStateAction<boolean>>;
    suitcases: Suitcase[];
    unsavedSuitcaseSelections: string[];
    setUnsavedSuitcaseSelections: Dispatch<SetStateAction<string[] | undefined>>
    handleSubmit: () => void;
}

const AddArticleToSuitcaseModal = ({
   setIsSelectingSuitcase,
   setCreatingSuitcase,
   suitcases,
   unsavedSuitcaseSelections,
   setUnsavedSuitcaseSelections,
   handleSubmit
}: AddArticleToSuitcaseModalProps) => {
    const openNewSuitcaseModal = () => {
        setIsSelectingSuitcase(false)
        setTimeout(() => setCreatingSuitcase(true), 150);
        // The setTimeout is used because the outsideClickHandler / eventListener inside the Modal
        // component conflicts with the action of opening the new modal. They essentially cancel each
        // other out. I believe the new modal tries to render and then closes very quickly. With this
        // timeout, we can avoid the two things conflicting with each other.
    }

    return (
        <Modal setIsOpen={setIsSelectingSuitcase}>
            <div className="md:h-[500px] md:w-[350px]">
                <button
                    onClick={() => handleSubmit()}
                    className="fixed top-4 right-4 bg-theme-light-green text-text-green self-end px-2 py-1 rounded-md drop-shadow md:text-xl"
                >
                    Save
                </button>

                <p className="text-xl mt-4 mb-4 md:text-2xl">Select suitcase(s):</p>

                <NewSuitcaseButton handleClick={() => openNewSuitcaseModal()}/>

                <SuitcaseOptions
                    suitcases={suitcases}
                    selectedSuitcases={unsavedSuitcaseSelections || []}
                    setSelectedSuitcases={setUnsavedSuitcaseSelections}
                />
            </div>
        </Modal>
    )
}

export default AddArticleToSuitcaseModal;