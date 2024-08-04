'use client'
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import {Dispatch, SetStateAction, useState} from "react";
import {updateSuitcase} from "@/app/server-actions/suitcase/updateSuitcase";
import {Suitcase} from "@/types/suitcase";
import ErrorModal from "@/app/components/modal/ErrorModal";
import TextButton from "@/app/components/buttons/TextButton";
import TextButtonFilled from "@/app/components/buttons/TextButtonFilled";

interface EditSuitcaseModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    suitcase: Suitcase;
}

const EditSuitcaseModal = ({ setIsOpen, suitcase }: EditSuitcaseModalProps) => {
    const [newSuitcaseName, setNewSuitcaseName] = useState<string>(suitcase.name);
    const [error, setError] = useState<boolean>();

    const errorMessage = "An error occurred while updating your suitcase name. Please try again."

    const handleSubmit = () => {
        if (newSuitcaseName) {
            updateSuitcase(suitcase.id, newSuitcaseName)
                .then(() => setIsOpen(false))
                .catch(() => setError(true))
        }
    }

    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    return (
        <Modal setIsOpen={setIsOpen}>
            <div className="md:w-[400px]">
                <CloseModalButton setIsOpen={setIsOpen}/>
                <form className="flex flex-col pt-20">
                    <input
                        value={newSuitcaseName}
                        type="text"
                        onChange={(e) => setNewSuitcaseName(e.target.value)}
                        className="border border-theme-green bg-theme-gray rounded-lg p-2 focus:outline-none md:text-xl"
                    />

                    <div className="self-end mt-4">
                        <TextButtonFilled disabled={suitcase.name === newSuitcaseName} handleClick={() => handleSubmit()}>
                            Update
                        </TextButtonFilled>
                    </div>
                </form>
            </div>
        </Modal>
)
}

export default EditSuitcaseModal;