'use client'
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";
import { Dispatch, SetStateAction } from "react";
import { deleteSuitcase } from "@/app/server-actions/suitcase/deleteSuitcase";

interface DeleteSuitcaseConfirmationModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    suitcaseId: string;
}

const DeleteSuitcaseConfirmationModal = ({setIsOpen, suitcaseId}: DeleteSuitcaseConfirmationModalProps) => {
    const handleSubmit = () => {
        deleteSuitcase(suitcaseId)
            // .then(() => setIsOpen(false))
    }

    return (
        <ConfirmationModal setIsOpen={setIsOpen} confirmAction={handleSubmit}>
            <p className="w-4/5 text-xl self-center text-center my-10">
                Are you sure you want to delete this suitcase?
            </p>
        </ConfirmationModal>
    )
}

export default DeleteSuitcaseConfirmationModal;