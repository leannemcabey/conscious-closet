'use client'
import { Article } from "@/types/article";
import { useState } from "react";
import ArticleActionToggle from "@/app/components/articles/ArticleActionToggle";
import Modal from "@/app/components/modal/Modal";
import Image from "next/image";
import {addOrRemoveFromTailoring} from "@/app/server-actions/needs-tailoring/addOrRemoveFromTailoring";
import ErrorModal from "@/app/components/modal/ErrorModal";

interface AddOrRemoveFromTailoringProps {
    article: Article;
}

const AddOrRemoveFromTailoring = ({ article }: AddOrRemoveFromTailoringProps) => {
    const [inTailoring, setInTailoring] = useState<boolean>(article.needsTailoring);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [error, setError] = useState<boolean>();

    const errorVerb = inTailoring ? "removing" : "adding";
    const errorPreposition = inTailoring ? "from" : "to"
    const errorMessage = `An error occurred while ${errorVerb} this article ${errorPreposition} tailoring. Please try again.`

    const changeTailoringStatus = () => {
        addOrRemoveFromTailoring(article)
            .then(() => setInTailoring(!inTailoring))
            .then(() => setShowConfirmation(true))
            .then(() => setTimeout(() => setShowConfirmation(false), 2000))
            .catch(() => setError(true))
    }

    return (
        <>
            <ArticleActionToggle iconFile="/sewing-machine-white.svg" iconAlt="needle icon" isActive={inTailoring} clickHandler={changeTailoringStatus} />

            {showConfirmation &&
                <Modal setIsOpen={setShowConfirmation}>
                    <div className="flex flex-col items-center text-center md:w-[400px] md:h-[400px] md:mt-12">
                        <Image unoptimized={true} src="/checkmark.gif" alt="success" height="200" width="200"/>
                        <p className="text-xl md:text-2xl mt-4">
                            {inTailoring ? "Added to tailoring" : "Removed from tailoring"}
                        </p>
                    </div>
                </Modal>
            }

            {error && <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />}
        </>
    )
}

export default AddOrRemoveFromTailoring;