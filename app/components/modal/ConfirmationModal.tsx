'use client'
import { Dispatch, ReactElement, SetStateAction } from "react";
import Modal from "@/app/components/modal/Modal";
import * as React from "react";
import TextButton from "@/app/components/buttons/TextButton";
import CloseModalButton from "@/app/components/modal/CloseModalButton";

interface ConfirmationModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    confirmAction: () => void;
    children?: ReactElement;
}

const ConfirmationModal = ({ setIsOpen, confirmAction, children }: ConfirmationModalProps) => {
    return (
        <Modal setIsOpen={setIsOpen}>
            <CloseModalButton setIsOpen={setIsOpen} />

            <div className="flex flex-col mt-6">
                {children}

                <div className="flex justify-center space-x-4 mb-2">
                    <TextButton disabled={false} handleClick={() => setIsOpen(false)} widthStyling="w-20" colorOverride="border-theme-red text-theme-red">
                        cancel
                    </TextButton>

                    <TextButton disabled={false} handleClick={() => confirmAction()} widthStyling="w-20">
                        confirm
                    </TextButton>
                </div>
            </div>
        </Modal>
)
}

export default ConfirmationModal;