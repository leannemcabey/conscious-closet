'use client'
import { createPortal } from 'react-dom';
import { Dispatch, SetStateAction } from "react";

interface ModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Modal = ({ setIsOpen, children }: ModalProps) => {
    return (
        <>
            {createPortal(
                <div data-testid="modal" className="flex justify-center w-full h-full">
                    <div className="flex flex-col bg-white px-4 py-4 rounded-md drop-shadow-2xl w-5/6 h-96 absolute top-1/3">
                        <div className="mt-8 mx-2">
                            {children}
                        </div>
                    </div>
                </div>,
                document.body.firstElementChild
            )}
        </>
    )
}

export default Modal;