'use client'
import { Dispatch, SetStateAction } from "react";
import Modal from "@/app/components/modal/Modal";
import * as React from "react";

interface ConfirmationModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    confirmAction: () => void;
}

const ConfirmationModal = ({ setIsOpen, confirmAction, children }: ConfirmationModalProps) => {
    return (
        <Modal setIsOpen={setIsOpen}>
            <div className="flex flex-col">
                {children}

                <div className="flex justify-center space-x-4">
                    <button
                        className="w-20 p-2 rounded-md border border-theme-mid-green drop-shadow-md"
                        onClick={() => confirmAction()}
                    >
                        Confirm
                    </button>

                    <button
                        className="w-20 p-2 rounded-md border border-theme-red drop-shadow-md"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
)
}

export default ConfirmationModal;