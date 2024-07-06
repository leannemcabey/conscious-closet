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
                        className="p-2 rounded-md bg-theme-mid-green text-white"
                        onClick={() => confirmAction()}
                    >
                        Confirm
                    </button>

                    <button
                        className="p-2 rounded-md bg-theme-red text-white"
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