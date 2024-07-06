'use client'
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";

interface DeleteConfirmationModalProps {
    setIsDeleting: Dispatch<SetStateAction<boolean>>
    handleSubmit: () => void
}

const DeleteAllFromCleanoutConfirmationModal = ({ setIsDeleting, handleSubmit }: DeleteConfirmationModalProps) => {
    return (
        <ConfirmationModal setIsOpen={setIsDeleting} confirmAction={handleSubmit}>
            <Image
                src={"/warning-icon.svg"}
                alt={"warning icon"}
                width="50"
                height="50"
                className="mt-2 self-center"
            />
            <p className="text-center text-xl my-8">
                Doing this will delete these articles from your closet as well as from your clean out bag!
            </p>
        </ConfirmationModal>
    )
}

export default DeleteAllFromCleanoutConfirmationModal;