'use client'
import Modal from "@/app/components/modal/Modal";
import AddToSuitcaseMenu from "@/app/components/suitcases/AddToSuitcaseMenu";
import { Dispatch, SetStateAction } from "react";
import { Article } from "@/types/Article";
import { Suitcase } from "@/types/Suitcase";

interface AddArticleToSuitcaseModalProps {
    setIsSelectingSuitcase: Dispatch<SetStateAction<boolean>>;
    article: Article;
    suitcases: Suitcase[];
    unsavedSuitcaseSelections: string[];
    setUnsavedSuitcaseSelections: Dispatch<SetStateAction<string[] | undefined>>
    setIsCreatingSuitcase: Dispatch<SetStateAction<boolean>>;
    handleSubmit: () => void;
}

const AddArticleToSuitcaseModal = ({ setIsSelectingSuitcase, article, suitcases, unsavedSuitcaseSelections, setUnsavedSuitcaseSelections, setIsCreatingSuitcase, handleSubmit }: AddArticleToSuitcaseModalProps) => {
    return (
        <Modal setIsOpen={setIsSelectingSuitcase}>
            <button onClick={() => handleSubmit()}
               className="fixed top-4 right-4 bg-theme-green text-white self-end px-2 py-1 rounded-md drop-shadow-md">
                Save
            </button>
            <AddToSuitcaseMenu
                articleId={article.id}
                suitcases={suitcases}
                selectedSuitcases={unsavedSuitcaseSelections || []}
                setSelectedSuitcases={setUnsavedSuitcaseSelections}
                setIsCreatingSuitcase={setIsCreatingSuitcase}
            />
        </Modal>
    )
}

export default AddArticleToSuitcaseModal;