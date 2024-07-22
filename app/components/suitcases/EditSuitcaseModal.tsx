'use client'
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import {Dispatch, SetStateAction, useState} from "react";
import {updateSuitcase} from "@/app/server-actions/suitcase/updateSuitcase";
import {Suitcase} from "@/types/suitcase";
import ErrorModal from "@/app/components/modal/ErrorModal";

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
            <CloseModalButton setIsOpen={setIsOpen} />
            <form className="flex flex-col pt-20">
                <input
                    value={newSuitcaseName}
                    type="text"
                    onChange={(e) => setNewSuitcaseName(e.target.value)}
                    className="border border-theme-green bg-theme-gray rounded-md p-2 focus:outline-none"
                />
                <button onClick={() => handleSubmit()}
                        className="bg-theme-mid-green text-white rounded-md drop-shadow w-max py-2 px-4 mt-4 self-end"
                >
                    Update
                </button>
            </form>
        </Modal>
    )
}

export default EditSuitcaseModal;