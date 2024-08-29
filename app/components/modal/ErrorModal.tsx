'use client'

import Image from "next/image";
import Modal from "@/app/components/modal/Modal";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import TextButton from "@/app/components/buttons/TextButton";

interface ErrorModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    errorMessage: string;
}

const ErrorModal = ({ setIsOpen, errorMessage }: ErrorModalProps) => {
    return (
        <Modal setIsOpen={setIsOpen}>
            <>
                <div className="flex flex-col items-center text-center">
                    <div>
                        <Image
                            unoptimized
                            src={"/warning-gold.gif"}
                            alt={"warning"}
                            width="100"
                            height="100"
                        />
                    </div>
                    <p className="text-2xl md:text-3xl mb-2 md:mb-4">Oops!</p>
                    <p className="text-base md:text-xl">
                        {errorMessage}
                    </p>
                    <p className="text-xs md:text-base text-neutral-400 my-2 md:my-4">
                        If the error persists, try logging out and back in again. If that doesn't work, please contact us at
                        <a
                            className="text-theme-blue"
                            href="mailto:leanne@consciouscloset.co"> leanne@consciouscloset.co
                        </a>.
                    </p>

                    <div className="mt-4 md:mt-8">
                        <TextButton disabled={false} handleClick={() => setIsOpen(false)} widthStyling="w-16">
                            OK
                        </TextButton>
                    </div>
                </div>
            </>
        </Modal>
    )
}

export default ErrorModal;