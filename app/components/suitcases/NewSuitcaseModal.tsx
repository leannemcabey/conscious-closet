'use client'
import { createSuitcase } from "@/app/server-actions/suitcase/createSuitcase";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import { Suitcase } from "@/types/suitcase";
import ErrorModal from "@/app/components/modal/ErrorModal";

interface NewSuitcaseModalProps {
    isOpen:  Dispatch<SetStateAction<boolean>>;
    suitcases: Suitcase[];
    setSuitcases: Dispatch<SetStateAction<Suitcase[] | undefined>>
}

const NewSuitcaseModal = ({ isOpen, suitcases, setSuitcases }: NewSuitcaseModalProps) => {
    const [suitcaseName, setSuitcaseName] = useState<string>();
    const [error, setError] = useState<boolean>();

    const errorMessage = "An error occurred while creating your new suitcase. Please try again."

    const buttonDisabled: boolean = suitcaseName === undefined;

    const handleSubmit = () => {
        if (suitcaseName) {
            createSuitcase(suitcaseName)
                .then((newSuitcase) => {
                    const copy = [...suitcases]
                    copy.unshift(newSuitcase)
                    setSuitcases(copy)
                })
                .then(() => isOpen(false))
                .catch(() => setError(true))
        }
    }

    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    return (
        <Modal setIsOpen={isOpen}>
            <CloseModalButton setIsOpen={isOpen} />
            <form className="flex flex-col pt-20">
                <input
                    placeholder="New suitcase name"
                    type="text"
                    onChange={(e) => setSuitcaseName(e.target.value)}
                    className="border border-theme-green bg-theme-gray rounded-md p-2 focus:outline-none"
                />
                <button onClick={() => handleSubmit()}
                        disabled={buttonDisabled}
                        className={`${buttonDisabled ? "bg-theme-gray text-neutral-300" : "bg-theme-mid-green text-white"} rounded-md drop-shadow w-max py-2 px-4 mt-4 self-end`}
                >
                    Add
                </button>
            </form>
        </Modal>
    )
}

export default NewSuitcaseModal;