'use client'
import { createSuitcase } from "@/app/server-actions/createSuitcase";
import {Dispatch, SetStateAction, useState} from "react";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";

interface NewSuitcaseModalProps {
    // isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const NewSuitcaseModal = ({ setIsOpen }: NewSuitcaseModalProps) => {
    const [suitcaseName, setSuitcaseName] = useState<string>("");

    const handleSubmit = () => {
        createSuitcase(suitcaseName)
        setIsOpen(false)
    }

    return (
        <Modal setIsOpen={setIsOpen} submit={() => console.log("submit")}>
            <CloseModalButton setIsOpen={setIsOpen} />
            <form onSubmit={() => handleSubmit()} className="flex flex-col pt-20">
                <input
                    placeholder="New suitcase name"
                    type="text"
                    onChange={(e) => setSuitcaseName(e.target.value)}
                    className="border border-theme-green bg-theme-gray rounded-md p-2"
                />
                <button type="submit"
                        className="rounded-md drop-shadow-md bg-theme-green w-max py-2 px-4 mt-4 text-white self-end">Add
                </button>
            </form>
        </Modal>
    )
}

export default NewSuitcaseModal;