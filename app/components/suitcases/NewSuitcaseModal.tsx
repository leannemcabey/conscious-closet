'use client'
import { createSuitcase } from "@/app/server-actions/suitcase/createSuitcase";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import { Suitcase } from "@/types/suitcase";
import ErrorModal from "@/app/components/modal/ErrorModal";
import TextButtonFilled from "@/app/components/buttons/TextButtonFilled";

interface NewSuitcaseModalProps {
    setIsOpen:  Dispatch<SetStateAction<boolean>>;
    suitcases: Suitcase[];
    setSuitcases: Dispatch<SetStateAction<Suitcase[] | undefined>>
}

const NewSuitcaseModal = ({ setIsOpen, suitcases, setSuitcases }: NewSuitcaseModalProps) => {
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
                .then(() => setIsOpen(false))
                .catch(() => setError(true))
        }
    }

    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    return (
        <Modal setIsOpen={setIsOpen}>
            <div className="md:w-[400px]">
                <CloseModalButton setIsOpen={setIsOpen} />
                <form className="flex flex-col pt-20">
                    <input
                        placeholder="New suitcase name"
                        type="text"
                        onChange={(e) => setSuitcaseName(e.target.value)}
                        className="border border-theme-green bg-theme-gray rounded-lg p-2 focus:outline-none md:text-xl"
                    />
                    <div className="self-end mt-4">
                        <TextButtonFilled handleClick={() => handleSubmit()} disabled={buttonDisabled}>
                            save
                        </TextButtonFilled>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default NewSuitcaseModal;