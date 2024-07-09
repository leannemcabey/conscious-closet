'use client'
import { Article } from "@/types/Article";
import { useEffect, useState } from "react";
import { Suitcase } from "@/types/Suitcase";
import { getSuitcases } from "@/app/server-actions/suitcase/getSuitcases";
import { addOrRemoveArticleToSuitcases } from "@/app/server-actions/suitcase/addOrRemoveArticleToSuitcases";
import { getArticleSuitcases } from "@/app/server-actions/suitcase/getArticleSuitcases";
import AddArticleToSuitcaseModal from "@/app/components/suitcases/AddArticleToSuitcaseModal";
import AddArticleToSuitcaseButton from "@/app/components/suitcases/AddArticleToSuitcaseButton";
import NewSuitcaseModal from "@/app/components/suitcases/NewSuitcaseModal";

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

    const closeOneOpenAnother = () => {
        setCreatingSuitcase(false)
        setSelectingSuitcase(true)
    }

    return (
        <>
            <AddArticleToSuitcaseButton selectingSuitcase={selectingSuitcase} setIsSelectingSuitcase={setSelectingSuitcase} />

            {selectingSuitcase &&
                <AddArticleToSuitcaseModal
                    setIsSelectingSuitcase={setSelectingSuitcase}
                    setCreatingSuitcase={setCreatingSuitcase}
                    article={article}
                    suitcases={suitcases || []}
                    setSuitcases={setSuitcases}
                    unsavedSuitcaseSelections={unsavedSuitcaseSelections || []}
                    setUnsavedSuitcaseSelections={setUnsavedSuitcaseSelections}
                    handleSubmit={saveSelections}
                />
            }

            {creatingSuitcase &&
                <NewSuitcaseModal
                    closeModal={closeOneOpenAnother}
                    setSuitcases={setSuitcases}
                />
            }
        </>
    )
}

export default AddArticleToSuitcase;