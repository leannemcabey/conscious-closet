'use client'
import { Dispatch, SetStateAction } from "react";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import NewArticleContainer from "@/app/components/articles/new/NewArticleContainer";
import { ArticleCategory } from "@/types/enums/ArticleCategory";

interface NewArticleModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    category: ArticleCategory;
}

const NewArticleModal = ({ setIsOpen, category }: NewArticleModalProps) => {
    return (
        <Modal setIsOpen={setIsOpen}>
            <CloseModalButton setIsOpen={setIsOpen} />
            <NewArticleContainer category={category} setAddingArticle={setIsOpen}/>
        </Modal>

    )
}

export default NewArticleModal;