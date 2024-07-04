'use client'
import { createSuitcase } from "@/app/server-actions/createSuitcase";
import {Dispatch, SetStateAction, useState} from "react";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import {Suitcase} from "@/types/Suitcase";
import {getSuitcases} from "@/app/server-actions/getSuitcases";
import {toSuitcase} from "@/utils/conversions/toSuitcase";
import {orderByNewestCreated} from "@/utils/orderByNewestCreated";

interface NewSuitcaseModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    setSuitcases: Dispatch<SetStateAction<Suitcase[] | undefined>>
}

const NewSuitcaseModal = ({ setIsOpen, setSuitcases }: NewSuitcaseModalProps) => {
    const [suitcaseName, setSuitcaseName] = useState<string>("");

    const fetchAndResetSuitcases = () => {
        getSuitcases()
            .then((data) => {
                const mapped = data?.map((suitcase) => toSuitcase(suitcase))
                const sorted = orderByNewestCreated(mapped as any[])
                setSuitcases(sorted)
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        createSuitcase(suitcaseName)
            .then(() => fetchAndResetSuitcases())
            .then(() => setIsOpen(false))
    }

    return (
        <Modal setIsOpen={setIsOpen} submit={() => console.log("submit")}>
            <CloseModalButton setIsOpen={setIsOpen} />
            <form onSubmit={(event) => handleSubmit(event)} className="flex flex-col pt-20">
                <input
                    autoFocus={true}
                    placeholder="New suitcase name"
                    type="text"
                    onChange={(e) => setSuitcaseName(e.target.value)}
                    className="border border-theme-green bg-theme-gray rounded-md p-2 focus:outline-none"
                />
                <button type="submit"
                        className="rounded-md drop-shadow-md bg-theme-green w-max py-2 px-4 mt-4 text-white self-end">Add
                </button>
            </form>
        </Modal>
    )
}

export default NewSuitcaseModal;