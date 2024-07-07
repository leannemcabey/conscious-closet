'use client'
import { Dispatch, SetStateAction } from "react";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import NewArticleContainer from "@/app/components/articles/new/NewArticleContainer";
import {ArticleCategory} from "@/types/enums/ArticleCategory";
import {GooglePhotoMetadata} from "@/types/GooglePhotoMetadata";
import Image from "next/image";
import * as React from "react";

interface ArticleCreationErrorAlertModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    unsetImage: Dispatch<SetStateAction<GooglePhotoMetadata | undefined>>
}

const ArticleCreationErrorAlertModal = ({ setIsOpen, unsetImage }: ArticleCreationErrorAlertModalProps) => {
    const handleSubmit = () => {
        unsetImage(undefined)
        setIsOpen(false)
    }

    return (
        <Modal setIsOpen={setIsOpen}>
            <div className="flex flex-col items-center text-center">
                <div>
                    <Image
                        src={"/hanger-warning.png"}
                        alt={"warning"}
                        width="200"
                        height="100"
                    />
                </div>
                <p className="text-2xl mb-2">Oops!</p>
                <p className="text-l">An error occurred when trying to add this article.
                    It may be that you already have it in your closet.</p>
                <button
                    className="mt-4 px-4 py-2 bg-theme-gray rounded-md drop-shadow-md"
                    onClick={() => setIsOpen(false)}
                >
                    OK
                </button>
            </div>
        </Modal>

    )
}

export default ArticleCreationErrorAlertModal;