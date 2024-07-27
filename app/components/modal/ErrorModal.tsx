'use client'

import Image from "next/image";
import Modal from "@/app/components/modal/Modal";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";

interface ErrorModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    errorMessage: string;
}

const ErrorModal = ({ setIsOpen, errorMessage }: ErrorModalProps) => {
    return (
        <Modal setIsOpen={setIsOpen}>
            <div className="flex flex-col items-center text-center">
                <div>
                    <Image
                        src={"/warning-gold.gif"}
                        alt={"warning"}
                        width="100"
                        height="100"
                    />
                </div>
                <p className="text-2xl mb-2">Oops!</p>
                <p className="text-lg">
                    {errorMessage}
                </p>
                <p className="text-xs text-neutral-400 my-2">
                    If the error persists, please contact us at leanne@consciouscloset.co.
                </p>
                <button
                    className="mt-4 px-4 py-2 bg-theme-gray rounded-md drop-shadow"
                    onClick={() => setIsOpen(false)}
                >
                    OK
                </button>
            </div>
        </Modal>
    )
}

export default ErrorModal;