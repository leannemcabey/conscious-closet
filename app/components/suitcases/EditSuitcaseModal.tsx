'use client'
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import {Dispatch, SetStateAction, useState} from "react";
import {updateSuitcase} from "@/app/server-actions/suitcase/updateSuitcase";
import {Suitcase} from "@/types/Suitcase";

interface EditSuitcaseModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    suitcase: Suitcase;
}

const EditSuitcaseModal = ({ setIsOpen, suitcase }: EditSuitcaseModalProps) => {
    const [newSuitcaseName, setNewSuitcaseName] = useState<string>();

    const buttonDisabled: boolean = newSuitcaseName === undefined;

    const handleSubmit = (event) => {
        if (newSuitcaseName) {
            event.preventDefault()
            updateSuitcase(suitcase.id, newSuitcaseName)
                // .then(() => fetchAndResetSuitcases())
                .then(() => setIsOpen(false))
        }
    }

    return (
        <Modal setIsOpen={setIsOpen}>
            <CloseModalButton setIsOpen={setIsOpen} />
            <form onSubmit={(event) => handleSubmit(event)} className="flex flex-col pt-20">
                <input
                    autoFocus={true}
                    placeholder={suitcase.name}
                    type="text"
                    onChange={(e) => setNewSuitcaseName(e.target.value)}
                    className="border border-theme-green bg-theme-gray rounded-md p-2 focus:outline-none"
                />
                <button type="submit"
                        disabled={buttonDisabled}
                        className={`${buttonDisabled ? "bg-theme-gray text-neutral-300" : "bg-theme-green text-white"} rounded-md drop-shadow-md w-max py-2 px-4 mt-4 self-end`}
                >
                    Update
                </button>
            </form>
        </Modal>
    )
}

export default EditSuitcaseModal;