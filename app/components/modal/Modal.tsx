'use client'
import { createPortal } from 'react-dom';
import { Dispatch, ReactElement, SetStateAction, useEffect, useRef } from "react";

interface ModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    children: ReactElement;
}

const Modal = ({ setIsOpen, children }: ModalProps) => {
    const modalRef = useRef(null);

    // Closes the modal if the user clicks outside of it
    const outsideClickHandler = (event: Event) => {
        const includesModalElement = event.composedPath().includes(modalRef.current!!);

        if (modalRef.current && !includesModalElement) {
            event.preventDefault()
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
                <div data-testid="translucent-layer" className="absolute top-0 left-0 h-screen w-screen bg-transparent-bg">
                    <div className="flex justify-center w-full h-full">
                        <div
                            ref={modalRef}
                            data-testid="modal"
                            className="flex flex-col bg-white px-4 py-4 rounded-t-lg border border-neutral-200 drop-shadow-2xl w-full min-h-80 max-h-[93%] absolute animate-enter-from-bottom"
                        >
                            <div className="mt-6 mx-2">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}

export default Modal;