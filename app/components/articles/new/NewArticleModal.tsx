'use client'
import { Dispatch, SetStateAction } from "react";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import NewArticleContainer from "@/app/components/articles/new/NewArticleContainer";
import { ArticleCategory } from "@/types/enums/ArticleCategory";
import { Article } from "@/types/Article";

interface NewArticleModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    category: ArticleCategory;
    unfilteredArticles: Article[];
    setUnfilteredArticles: Dispatch<SetStateAction<Article[]>>;
}

const NewArticleModal = ({ setIsOpen, category, unfilteredArticles, setUnfilteredArticles }: NewArticleModalProps) => {
    return (
        <Modal setIsOpen={setIsOpen}>
            <CloseModalButton setIsOpen={setIsOpen} />
            <NewArticleContainer
                category={category}
                setAddingArticle={setIsOpen}
                unfilteredArticles={unfilteredArticles}
                setUnfilteredArticles={setUnfilteredArticles}
            />
        </Modal>

    )
}

export default NewArticleModal;