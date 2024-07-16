'use client'
import { Dispatch, SetStateAction } from "react";
import Modal from "@/app/components/modal/Modal";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import Image from "next/image";
import * as React from "react";

interface ArticleCreationErrorAlertModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ArticleCreationErrorAlertModal = ({ setIsOpen }: ArticleCreationErrorAlertModalProps) => {
    return (
        <Modal setIsOpen={setIsOpen}>
            <div className="flex flex-col items-center text-center">
                <div>
                    <Image
                        src={"/warning-gold.gif"}
                        alt={"warning"}
                        width="125"
                        height="125"
                    />
                </div>
                <p className="text-2xl mb-2">Oops!</p>
                <p className="text-l">An error occurred when trying to add this article.
                    It may be that you already have it in your closet.</p>
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

export default ArticleCreationErrorAlertModal;