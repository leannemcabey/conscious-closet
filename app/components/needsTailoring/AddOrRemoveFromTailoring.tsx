'use client'
import { Article } from "@/types/article";
import { useState } from "react";
import ArticleActionToggle from "@/app/components/articles/ArticleActionToggle";
import Modal from "@/app/components/modal/Modal";
import Image from "next/image";
import {addOrRemoveFromTailoring} from "@/app/server-actions/needs-tailoring/addOrRemoveFromTailoring";
import ErrorModal from "@/app/components/modal/ErrorModal";
import SuccessModal from "@/app/components/modal/SuccessModal";
import * as React from "react";

interface AddOrRemoveFromTailoringProps {
    article: Article;
}

const AddOrRemoveFromTailoring = ({ article }: AddOrRemoveFromTailoringProps) => {
    const [inTailoring, setInTailoring] = useState<boolean>(article.needsTailoring);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

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
            <ArticleActionToggle iconFile="/sewing-machine.svg" iconAlt="needle icon" isActive={inTailoring} clickHandler={changeTailoringStatus} />

            {showConfirmation &&
                <SuccessModal setIsOpen={setShowConfirmation}>
                    <p className="text-xl mt-4">
                        <p className="text-xl md:text-2xl mt-4">
                            {inTailoring ? "Added to tailoring" : "Removed from tailoring"}
                        </p>
                    </p>
                </SuccessModal>
            }

            {error && <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />}
        </>
    )
}

export default AddOrRemoveFromTailoring;