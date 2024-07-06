'use client'
import Modal from "@/app/components/modal/Modal";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface DeleteConfirmationModalProps {
    setIsDeleting: Dispatch<SetStateAction<boolean>>
    handleSubmit: () => void
}

const DeleteConfirmationModal = ({ setIsDeleting, handleSubmit }: DeleteConfirmationModalProps) => {
    return (
        <Modal setIsOpen={setIsDeleting}>
            <div className="flex flex-col">
                <Image
                    src={"/warning-icon.svg"}
                    alt={"warning icon"}
                    width="50"
                    height="50"
                    className="mt-2 self-center"
                />
                <p className="text-center text-xl my-8">Doing this will delete these articles from your closet as well as from your clean out bag!</p>
                <div className="flex justify-center space-x-4">
                    <button
                        className="p-2 rounded-md bg-theme-mid-green text-white"
                        onClick={() => handleSubmit()}
                    >
                        Confirm
                    </button>

                    <button
                        className="p-2 rounded-md bg-theme-red text-white"
                        onClick={() => setIsDeleting(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteConfirmationModal;