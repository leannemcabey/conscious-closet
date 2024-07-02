'use client'
import { createSuitcase } from "@/app/server-actions/createSuitcase";
import {Dispatch, SetStateAction, useState} from "react";
import Modal from "@/app/components/Modal";

interface NewSuitcaseModalProps {
    // isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean | undefined>>
}

const NewSuitcaseModal = ({ setIsOpen }: NewSuitcaseModalProps) => {
    const [suitcaseName, setSuitcaseName] = useState<string>("");

    return (
        <Modal setIsOpen={setIsOpen} submit={() => console.log("submit")}>
            <form onSubmit={() => createSuitcase(suitcaseName)} className="flex flex-col">
                <label>Trip Name:
                    <input
                        type="text"
                        onChange={(e) => setSuitcaseName(e.target.value)}
                        className="border border-black"
                    />
                </label>
                <button type="submit" className="rounded-md bg-theme-green w-max p-2 text-white">Create</button>
            </form>
        </Modal>
    )
}

export default NewSuitcaseModal;