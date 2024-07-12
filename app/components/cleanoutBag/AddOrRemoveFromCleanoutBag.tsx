'use client'
import Image from "next/image";
import { useState } from "react";
import { addOrRemoveFromCleanoutBag } from "@/app/server-actions/cleanout-bag/addOrRemoveFromCleanoutBag";
import { Article } from "@/types/Article";
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
    const toggleStyling = inCleanoutBag ? "bg-theme-blue" : "bg-background-green";

    return (
        <>
            <div className={`flex ${position} ${toggleStyling} border border-theme-blue rounded-full w-20 h-max drop-shadow`}>
                <div className={`h-12 w-12 bg-background-green border border-theme-blue rounded-full p-2 drop-shadow`}>
                    <Image
                        src={"/broom-icon.png"}
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