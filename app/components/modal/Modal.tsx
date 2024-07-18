'use client'
import { createPortal } from 'react-dom';
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface ModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ setIsOpen, children }: ModalProps) => {
    const modalRef = useRef(null);

    // Closes the modal if the user clicks outside of it
    const outsideClickHandler = (event) => {
        const includesModalElement = event.composedPath().includes(modalRef.current!!);
        if (modalRef.current && !includesModalElement) {
            console.log('outside click triggered')
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', outsideClickHandler);
        return () => {
            document.body.removeEventListener('click', outsideClickHandler);
        }
    }, []);

    return (
        <>
            {createPortal(
                <div ref={modalRef} data-testid="modal" className="flex justify-center w-full h-full">
                    <div className="flex flex-col bg-white px-4 py-4 rounded-md border border-neutral-200 drop-shadow-2xl w-5/6 min-h-80 max-h-[550px] absolute top-1/3">
                        <div className="mt-6 mx-2">
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