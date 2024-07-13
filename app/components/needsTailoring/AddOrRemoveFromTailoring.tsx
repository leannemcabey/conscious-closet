'use client'
import { Article } from "@/types/article";
import { useState } from "react";
import ArticleActionToggle from "@/app/components/articles/ArticleActionToggle";
import Modal from "@/app/components/modal/Modal";
import Image from "next/image";
import {addOrRemoveFromTailoring} from "@/app/server-actions/needs-tailoring/addOrRemoveFromTailoring";

interface AddOrRemoveFromTailoringProps {
    article: Article;
}

const AddOrRemoveFromTailoring = ({ article }: AddOrRemoveFromTailoringProps) => {
    const [inTailoring, setInTailoring] = useState<boolean>(article.needsTailoring);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

    const changeTailoringStatus = () => {
        addOrRemoveFromTailoring(article)
            .then(() => setInTailoring(!inTailoring))
            .then(() => setShowConfirmation(true))
            .then(() => setTimeout(() => setShowConfirmation(false), 2000))
    }

    return (
        <>
            <ArticleActionToggle iconFile="/needle-green.svg" iconAlt="needle icon" isActive={inTailoring} clickHandler={changeTailoringStatus} />

            {showConfirmation &&
                <Modal setIsOpen={setShowConfirmation}>
                    <div className="flex flex-col items-center text-center">
                        <Image unoptimized={true} src="/reuse.gif" alt="shirt with recycle symbol" height="200" width="200"/>
                        <p className="text-xl mt-4">
                            {inTailoring ? "Added to tailoring!" : "Removed from tailoring!"}
                        </p>
                    </div>
                </Modal>
            }
        </>
    )
}

export default AddOrRemoveFromTailoring;