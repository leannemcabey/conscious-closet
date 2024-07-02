'use client'
import { createPortal } from 'react-dom';
import { Dispatch, SetStateAction } from "react";

interface ModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean | undefined>>
    submit: () => void
}

const Modal = ({ setIsOpen, submit, children }: ModalProps) => {
    const handleSubmit = () => {
        setIsOpen(false)
        submit()
    }

    return (
        <>
            {createPortal(
                <div data-testid="modal" className="flex justify-center w-full h-full">
                    <div className="flex flex-col bg-white px-4 py-4 rounded-md drop-shadow-2xl w-5/6 h-96 absolute top-1/3">
                            <p onClick={() => handleSubmit()}
                               className="fixed top-4 right-4 mb-4 text-xl text-theme-green font-semibold self-end">
                                ✔
                            </p>
                        <div className="overflow-scroll mt-8">
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