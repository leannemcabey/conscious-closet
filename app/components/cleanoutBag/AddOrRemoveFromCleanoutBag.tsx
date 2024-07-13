'use client'
import Image from "next/image";
import { useState } from "react";
import { addOrRemoveFromCleanoutBag } from "@/app/server-actions/cleanout-bag/addOrRemoveFromCleanoutBag";
import { Article } from "@/types/article";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";

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

    const position = inCleanoutBag ? "justify-end" : "";
    const toggleStyling = inCleanoutBag ? "bg-theme-mid-green" : "bg-white";
    // const buttonStyling = inCleanoutBag ? "border-theme-mid-green" : "border-neutral-700"

    return (
        <>
            <div className={`flex ${position} ${toggleStyling} rounded-full w-20 h-max drop-shadow`}>
                <div className={`h-12 w-12 bg-white border border-theme-green rounded-full p-2 drop-shadow`}>
                    <Image
                        src={"/broom-green.svg"}
                        alt={"broom icon"}
                        width="30" height="30"
                        onClick={() => changeCleanoutBagStatus()}
                    />
                </div>
            </div>

            {showConfirmation &&
                <Modal setIsOpen={setShowConfirmation}>
                    <div className="flex flex-col items-center text-center">
                        <Image unoptimized={true} src="/cleanout.gif" alt="broom sweeping" height="200" width="200"/>
                        <p className="text-xl mt-4 text-theme-blue">
                            {inCleanoutBag ? "Added to cleanout bag!" : "Removed from cleanout bag!"}
                        </p>
                    </div>
                </Modal>
            }
        </>
    )
};

export default AddOrRemoveFromCleanoutBag;