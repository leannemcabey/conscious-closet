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
            <>
                <Image
                    unoptimized
                    src={"/warning-gold.gif"}
                    alt={"warning"}
                    width="125"
                    height="125"
                    className="self-center"
                />
                <p className="text-center text-lg mt-1 mb-2 md:text-2xl">
                    Are you sure?
                </p>
                <p className="text-center text-sm mb-8 md:text-lg">
                    Doing this will delete all cleanout bag articles (regardless of applied filters!) from your closet as well as from your clean out bag.
                </p>
            </>
        </ConfirmationModal>
    )
}

export default DeleteAllFromCleanoutConfirmationModal;