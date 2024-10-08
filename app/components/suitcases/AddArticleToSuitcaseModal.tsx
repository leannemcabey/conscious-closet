'use client'
import Modal from "@/app/components/modal/Modal";
import SuitcaseOptions from "@/app/components/suitcases/SuitcaseOptions";
import { Dispatch, SetStateAction } from "react";
import { Suitcase } from "@/types/suitcase";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import SaveButton from "@/app/components/buttons/SaveButton";
import NewButton from "@/app/components/buttons/NewButton";

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
            <>
                <CloseModalButton setIsOpen={setIsSelectingSuitcase} />
                <div className="flex flex-col md:h-[500px] mt-6">
                    <div className="flex place-content-between">
                        <p className="text-xl mt-4 mb-4 md:text-2xl lg:text-lg">Select suitcase(s):</p>

                        <NewButton handleClick={() => openNewSuitcaseModal()}/>
                    </div>

                    <SuitcaseOptions
                        suitcases={suitcases}
                        selectedSuitcases={unsavedSuitcaseSelections || []}
                        setSelectedSuitcases={setUnsavedSuitcaseSelections}
                    />

                    <SaveButton disabled={!suitcases.length} handleClick={handleSubmit} />
                </div>
            </>
        </Modal>
    )
}

export default AddArticleToSuitcaseModal;