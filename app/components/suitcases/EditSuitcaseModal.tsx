'use client'
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import { Dispatch, SetStateAction, useState } from "react";
import { updateSuitcase } from "@/app/server-actions/suitcase/updateSuitcase";
import { Suitcase } from "@/types/suitcase";
import ErrorModal from "@/app/components/modal/ErrorModal";
import TextButton from "@/app/components/buttons/TextButton";

interface EditSuitcaseModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    suitcase: Suitcase;
}

const EditSuitcaseModal = ({ setIsOpen, suitcase }: EditSuitcaseModalProps) => {
    const [newSuitcaseName, setNewSuitcaseName] = useState<string>(suitcase.name);
    const [error, setError] = useState<boolean>(false);

    const errorMessage = "An error occurred while updating your suitcase name. Please try again."

    const handleSubmit = () => {
        if (newSuitcaseName) {
            updateSuitcase(suitcase.id, newSuitcaseName)
                .then(() => {
                    setIsOpen(false)
                })
                .catch(() => setError(true))
        }
    }

    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    return (
        <Modal setIsOpen={setIsOpen}>
            <div>
                <CloseModalButton setIsOpen={setIsOpen}/>
                <div className="flex flex-col pt-20">
                    <input
                        value={newSuitcaseName}
                        type="text"
                        onChange={(e) => setNewSuitcaseName(e.target.value)}
                        className="border border-theme-green bg-theme-gray rounded-lg p-2 focus:outline-none md:text-xl"
                    />

                    <div className="self-end mt-4">
                        <TextButton disabled={suitcase.name === newSuitcaseName} handleClick={() => handleSubmit()}>
                            Update
                        </TextButton>
                    </div>
                </div>
            </div>
        </Modal>
)
}

export default EditSuitcaseModal;