'use client'
import { Dispatch, SetStateAction } from "react";
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";

interface DeleteArticleModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    handleSubmit: () => void
}

const DeleteArticleModal = ({ setIsOpen, handleSubmit }: DeleteArticleModalProps) => {
    return (
        <ConfirmationModal setIsOpen={setIsOpen} confirmAction={handleSubmit}>
            <p className="text-center text-xl mt-14 mb-8 md:text-2xl">
                Are you sure you want to delete this article from your closet?
            </p>
        </ConfirmationModal>
    )
}

export default DeleteArticleModal;