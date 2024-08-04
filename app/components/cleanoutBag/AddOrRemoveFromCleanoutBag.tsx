'use client'
import Image from "next/image";
import { useState } from "react";
import { addOrRemoveFromCleanoutBag } from "@/app/server-actions/cleanout-bag/addOrRemoveFromCleanoutBag";
import { Article } from "@/types/article";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import ArticleActionToggle from "@/app/components/articles/ArticleActionToggle";
import ErrorModal from "@/app/components/modal/ErrorModal";

interface AddOrRemoveFromCleanoutBagProps {
    article: Article;
}

const AddOrRemoveFromCleanoutBag = ({ article }: AddOrRemoveFromCleanoutBagProps) => {
    const [inCleanoutBag, setInCleanoutBag] = useState<boolean>(article.inCleanoutBag);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [error, setError] = useState<boolean>();

    const errorVerb = inCleanoutBag ? "removing" : "adding";
    const errorPreposition = inCleanoutBag ? "from" : "to";
    const errorMessage = `An error occurred while ${errorVerb} this article ${errorPreposition} your cleanout bag. Please try again.`

    const changeCleanoutBagStatus = () => {
        addOrRemoveFromCleanoutBag(article)
            .then(() => setInCleanoutBag(!inCleanoutBag))
            .then(() => setShowConfirmation(true))
            .then(() => setTimeout(() => setShowConfirmation(false), 2000))
            .catch(() => setError(true))
    }

    return (
        <>
            <ArticleActionToggle iconFile="/broom.svg" iconAlt="broom icon" isActive={inCleanoutBag} clickHandler={changeCleanoutBagStatus} />

            {showConfirmation &&
                <Modal setIsOpen={setShowConfirmation}>
                    <div className="flex flex-col items-center text-center md:w-[400px] md:h-[400px] md:mt-12">
                        <Image unoptimized={true} src="/checkmark.gif" alt="success" height="200" width="200"/>
                        <p className="text-xl mt-4 md:text-2xl">
                            {inCleanoutBag ? "Added to cleanout bag" : "Removed from cleanout bag"}
                        </p>
                    </div>
                </Modal>
            }

            {error && <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />}
        </>
    )
};

export default AddOrRemoveFromCleanoutBag;