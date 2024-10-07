'use client'
import { Dispatch, SetStateAction } from "react";
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";
import Link from "next/link";
import * as React from "react";
import Image from "next/image";

interface DeleteArticleModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    handleSubmit: () => void
}

const DeleteArticleModal = ({ setIsOpen, handleSubmit }: DeleteArticleModalProps) => {
    return (
        <ConfirmationModal setIsOpen={setIsOpen} confirmAction={handleSubmit}>
            <div className="space-y-2 mb-8">
                <p className="text-center text-xl md:text-2xl">
                    Are you sure you want to delete this article from your closet?
                </p>
                <div className="flex flex-col items-center self-center text-center space-y-1 text-xs py-4 px-2 bg-theme-light-gold text-neutral-600 rounded-lg md:text-xl">
                    <Image
                        src="/earth.svg"
                        alt="earth icon"
                        width="25"
                        height="25"
                    />
                    <p className="font-bold">
                        Friendly reminder that clothes aren't trash!
                    </p>
                    <p>
                        Check out our <Link href="/cleanout/recommendations" className="text-theme-green"> cleanout recs </Link>
                        page for some suggestions on sustainable ways to clean out your closet.
                    </p>
                </div>
            </div>
        </ConfirmationModal>
    )
}

export default DeleteArticleModal;