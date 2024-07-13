'use client'
import Image from "next/image";
import { useState } from "react";
import { addOrRemoveFromCleanoutBag } from "@/app/server-actions/cleanout-bag/addOrRemoveFromCleanoutBag";
import { Article } from "@/types/article";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import ArticleActionToggle from "@/app/components/articles/ArticleActionToggle";

interface AddOrRemoveFromCleanoutBagProps {
    article: Article;
}

const AddOrRemoveFromCleanoutBag = ({ article }: AddOrRemoveFromCleanoutBagProps) => {
    const [inCleanoutBag, setInCleanoutBag] = useState<boolean>(article.inCleanoutBag);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

    const changeCleanoutBagStatus = () => {
        addOrRemoveFromCleanoutBag(article)
            .then(() => setInCleanoutBag(!inCleanoutBag))
            .then(() => setShowConfirmation(true))
            .then(() => setTimeout(() => setShowConfirmation(false), 2000))
    }

    return (
        <>
            <ArticleActionToggle iconFile="/broom-green.svg" iconAlt="broom icon" isActive={inCleanoutBag} clickHandler={changeCleanoutBagStatus} />

            {showConfirmation &&
                <Modal setIsOpen={setShowConfirmation}>
                    <div className="flex flex-col items-center text-center">
                        <Image unoptimized={true} src="/cleanout.gif" alt="broom sweeping" height="200" width="200"/>
                        <p className="text-xl mt-4">
                            {inCleanoutBag ? "Added to cleanout bag!" : "Removed from cleanout bag!"}
                        </p>
                    </div>
                </Modal>
            }
        </>
    )
};

export default AddOrRemoveFromCleanoutBag;