'use client'
import { Dispatch, SetStateAction } from "react";
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";
import Link from "next/link";
import * as React from "react";

interface DeleteArticleModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    handleSubmit: () => void
}

const DeleteArticleModal = ({ setIsOpen, handleSubmit }: DeleteArticleModalProps) => {
    return (
        <ConfirmationModal setIsOpen={setIsOpen} confirmAction={handleSubmit}>
            <p className="self-center w-[80%] text-center text-base p-2 bg-neutral-200 rounded-lg md:text-xl">
                Reminder that clothes aren't trash! Check out our <Link href="/cleanout/recommendations" className="text-theme-green"> cleanout recs </Link>
                page for some suggestions on sustainable ways to clean out your closet.
            </p>
            <p className="text-center text-xl my-8 md:text-2xl">
                Are you sure you want to delete this article from your closet?
            </p>
        </ConfirmationModal>
    )
}

export default DeleteArticleModal;