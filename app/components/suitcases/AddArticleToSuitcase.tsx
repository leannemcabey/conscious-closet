'use client'
import { Article } from "@/types/article";
import { useEffect, useState } from "react";
import { Suitcase } from "@/types/suitcase";
import { getSuitcases } from "@/app/server-actions/suitcase/getSuitcases";
import { addOrRemoveArticleToSuitcases } from "@/app/server-actions/suitcase/addOrRemoveArticleToSuitcases";
import { getArticleSuitcases } from "@/app/server-actions/suitcase/getArticleSuitcases";
import AddArticleToSuitcaseModal from "@/app/components/suitcases/AddArticleToSuitcaseModal";
import NewSuitcaseModal from "@/app/components/suitcases/NewSuitcaseModal";
import ArticleActionButton from "@/app/components/articles/ArticleActionButton";

interface AddArticleToSuitcaseProps {
    article: Article;
}

const AddArticleToSuitcase = ({ article }: AddArticleToSuitcaseProps) => {
    const [selectingSuitcase, setSelectingSuitcase] = useState<boolean>(false)
    const [creatingSuitcase, setCreatingSuitcase] = useState<boolean>(false);
    const [suitcases, setSuitcases] = useState<Suitcase[]>()
    const [unsavedSuitcaseSelections, setUnsavedSuitcaseSelections] = useState<string[]>();
    const [savedSuitcaseSelections, setSavedSuitcaseSelections] = useState<string[]>();

    useEffect(() => {
        getSuitcases()
            .then((data) => setSuitcases(data))
    }, [])

    useEffect(() => {
        getArticleSuitcases(article.id)
            .then((data) => {
                setSavedSuitcaseSelections(data)
                // `unsavedSuitcaseSelections` should at least have the saved suitcases before
                // changes are made as this is what controls whether the suitcase is checked off
                setUnsavedSuitcaseSelections(data)
            })
    }, [])

    const saveSelections = () => {
        if (unsavedSuitcaseSelections) {
            addOrRemoveArticleToSuitcases(article.id, unsavedSuitcaseSelections, savedSuitcaseSelections || [])
                .then((data) => {
                    const ids = data?.map((selection) => selection.suitcase_id)
                    setSavedSuitcaseSelections([...ids])
                    setUnsavedSuitcaseSelections([...ids])
                    setSelectingSuitcase(false)
                })
        }
    }

    const closeCreatingOpenSelectingModal = () => {
        setCreatingSuitcase(false)
        setSelectingSuitcase(true)
    }

    return (
        <>
            <ArticleActionButton
                iconFile="/suitcase-green.svg"
                iconAlt="suitcase icon"
                clickHandler={() => setSelectingSuitcase(!selectingSuitcase)}
            />

            {selectingSuitcase &&
                <AddArticleToSuitcaseModal
                    setIsSelectingSuitcase={setSelectingSuitcase}
                    setCreatingSuitcase={setCreatingSuitcase}
                    article={article}
                    suitcases={suitcases || []}
                    unsavedSuitcaseSelections={unsavedSuitcaseSelections || []}
                    setUnsavedSuitcaseSelections={setUnsavedSuitcaseSelections}
                    handleSubmit={saveSelections}
                />
            }

            {creatingSuitcase &&
                <NewSuitcaseModal
                    closeModal={closeCreatingOpenSelectingModal}
                    suitcases={suitcases || []}
                    setSuitcases={setSuitcases}
                />
            }
        </>
    )
}

export default AddArticleToSuitcase;