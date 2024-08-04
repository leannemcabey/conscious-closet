'use client'
import Modal from "@/app/components/modal/Modal";
import SuitcaseOptions from "@/app/components/suitcases/SuitcaseOptions";
import { Dispatch, SetStateAction } from "react";
import { Suitcase } from "@/types/suitcase";
import NewSuitcaseButton from "@/app/components/suitcases/NewSuitcaseButton";
import TextButtonFilled from "@/app/components/buttons/TextButtonFilled";
import CloseModalButton from "@/app/components/modal/CloseModalButton";

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
            <CloseModalButton setIsOpen={setIsSelectingSuitcase} />
            <div className="flex flex-col md:h-[500px] md:w-[350px]">
                <p className="text-xl mt-4 mb-4 md:text-2xl">Select suitcase(s):</p>

                <NewSuitcaseButton handleClick={() => openNewSuitcaseModal()}/>

                <SuitcaseOptions
                    suitcases={suitcases}
                    selectedSuitcases={unsavedSuitcaseSelections || []}
                    setSelectedSuitcases={setUnsavedSuitcaseSelections}
                />

                <div className="self-end mt-4">
                    <TextButtonFilled handleClick={() => handleSubmit()} disabled={false}>
                        save
                    </TextButtonFilled>
                </div>
            </div>
        </Modal>
    )
}

export default AddArticleToSuitcaseModal;