'use client'
import { createSuitcase } from "@/app/server-actions/suitcase/createSuitcase";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import { Suitcase } from "@/types/Suitcase";

interface NewSuitcaseModalProps {
    closeModal: () => void;
    suitcases: Suitcase[];
    setSuitcases: Dispatch<SetStateAction<Suitcase[] | undefined>>
}

const NewSuitcaseModal = ({ closeModal, suitcases, setSuitcases }: NewSuitcaseModalProps) => {
    const [suitcaseName, setSuitcaseName] = useState<string>();

    const buttonDisabled: boolean = suitcaseName === undefined;

    const handleSubmit = (event) => {
        if (suitcaseName) {
            event.preventDefault()
            createSuitcase(suitcaseName)
                .then((newSuitcase) => {
                    const copy = [...suitcases]
                    copy.unshift(newSuitcase)
                    setSuitcases(copy)
                })
                .then(() => closeModal())
        }
    }

    return (
        <Modal setIsOpen={closeModal}>
            <CloseModalButton setIsOpen={closeModal} />
            <form onSubmit={(event) => handleSubmit(event)} className="flex flex-col pt-20">
                <input
                    autoFocus={true}
                    placeholder="New suitcase name"
                    type="text"
                    onChange={(e) => setSuitcaseName(e.target.value)}
                    className="border border-theme-green bg-theme-gray rounded-md p-2 focus:outline-none"
                />
                <button type="submit"
                        disabled={buttonDisabled}
                        className={`${buttonDisabled ? "bg-theme-gray text-neutral-300" : "bg-theme-mid-green text-white"} rounded-md drop-shadow w-max py-2 px-4 mt-4 self-end`}>Add
                </button>
            </form>
        </Modal>
    )
}

export default NewSuitcaseModal;