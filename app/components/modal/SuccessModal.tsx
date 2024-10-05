'use client'

import Image from "next/image";
import Modal from "@/app/components/modal/Modal";
import { Dispatch, ReactElement, SetStateAction } from "react";

interface SuccessModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    children?: ReactElement;
}

const SuccessModal = ({ setIsOpen, children }: SuccessModalProps) => {
    return (
        <Modal setIsOpen={setIsOpen}>
            <div className="flex flex-col items-center text-center md:h-[400px] md:mt-12">
                <Image unoptimized={true} src="/checkmark.gif" alt="success" height="200" width="200"/>
                {children}
            </div>
        </Modal>
    )
}

export default SuccessModal;