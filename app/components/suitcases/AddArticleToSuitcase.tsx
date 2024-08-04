'use client'
import { Article } from "@/types/article";
import { useEffect, useState } from "react";
import { Suitcase } from "@/types/suitcase";
import { getSuitcases } from "@/app/server-actions/suitcase/getSuitcases";
import { addOrRemoveArticleToSuitcases } from "@/app/server-actions/suitcase/addOrRemoveArticleToSuitcases";
import { getArticleSuitcaseIds } from "@/app/server-actions/suitcase/getArticleSuitcaseIds";
import AddArticleToSuitcaseModal from "@/app/components/suitcases/AddArticleToSuitcaseModal";
import NewSuitcaseModal from "@/app/components/suitcases/NewSuitcaseModal";
import ArticleActionButton from "@/app/components/articles/ArticleActionButton";
import ErrorModal from "@/app/components/modal/ErrorModal";

interface AddArticleToSuitcaseProps {
    article: Article;
}

const AddArticleToSuitcase = ({ article }: AddArticleToSuitcaseProps) => {
    const [selectingSuitcase, setSelectingSuitcase] = useState<boolean>(false)
    const [creatingSuitcase, setCreatingSuitcase] = useState<boolean>(false);
    const [suitcases, setSuitcases] = useState<Suitcase[]>()
    const [unsavedSuitcaseSelections, setUnsavedSuitcaseSelections] = useState<string[]>();
    const [savedSuitcaseSelections, setSavedSuitcaseSelections] = useState<string[]>();
    const [fetchError, setFetchError] = useState<boolean>();
    const [updateError, setUpdateError] = useState<boolean>();

    const fetchErrorMessage = "An error occurred when retrieving your suitcases. Please go back and try again."
    const updateErrorMessage = "An error occurred when updating this article's suitcases. Please try again."

    useEffect(() => {
        getSuitcases()
            .then((suitcases) => setSuitcases(suitcases))
            .catch(() => setFetchError(true))
    }, [])

    useEffect(() => {
        getArticleSuitcaseIds(article.id)
            .then((data) => {
                setSavedSuitcaseSelections(data)
                // `unsavedSuitcaseSelections` should at least have the saved suitcases before
                // changes are made as this is what controls whether the suitcase is checked off
                setUnsavedSuitcaseSelections(data)
            })
            .catch(() => setFetchError(true))
    }, [])

    const sortBySelected = (suitcases?: Suitcase[]) => {
        return suitcases?.sort((suitcase) => (savedSuitcaseSelections?.includes(suitcase.id)) ? -1 : 1)
    }

    const saveSelections = () => {
        if (unsavedSuitcaseSelections) {
            addOrRemoveArticleToSuitcases(article.id, unsavedSuitcaseSelections, savedSuitcaseSelections || [])
                .then((suitcaseIds) => {
                    setSavedSuitcaseSelections([...suitcaseIds])
                    setUnsavedSuitcaseSelections([...suitcaseIds])
                    setSelectingSuitcase(false)
                })
                .catch(() => setUpdateError(true))
        }
    }

    return (
        <>
            <ArticleActionButton
                iconFile="/suitcase.svg"
                iconAlt="suitcase icon"
                clickHandler={() => setSelectingSuitcase(!selectingSuitcase)}
            />

            {selectingSuitcase && fetchError && <ErrorModal setIsOpen={setSelectingSuitcase} errorMessage={fetchErrorMessage} />}
            {selectingSuitcase && updateError && <ErrorModal setIsOpen={setSelectingSuitcase} errorMessage={updateErrorMessage} />}

            {selectingSuitcase && !fetchError && !updateError &&
                <AddArticleToSuitcaseModal
                    setIsSelectingSuitcase={setSelectingSuitcase}
                    setCreatingSuitcase={setCreatingSuitcase}
                    suitcases={sortBySelected(suitcases) || []}
                    unsavedSuitcaseSelections={unsavedSuitcaseSelections || []}
                    setUnsavedSuitcaseSelections={setUnsavedSuitcaseSelections}
                    handleSubmit={saveSelections}
                />
            }

            {creatingSuitcase &&
                <NewSuitcaseModal
                    setIsOpen={setCreatingSuitcase}
                    suitcases={suitcases || []}
                    setSuitcases={setSuitcases}
                />
            }
        </>
    )
}

export default AddArticleToSuitcase;