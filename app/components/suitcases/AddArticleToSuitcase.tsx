'use client'
import Image from "next/image";
import { Article } from "@/types/Article";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import { Suitcase } from "@/types/Suitcase";
import { getSuitcases } from "@/app/server-actions/getSuitcases";
import Modal from "@/app/components/modal/Modal";
import AddToSuitcaseMenu from "@/app/components/suitcases/AddToSuitcaseMenu";
import {addOrRemoveArticleToSuitcase} from "@/app/server-actions/addOrRemoveArticleToSuitcase";
import {getArticleSuitcases} from "@/app/server-actions/getArticleSuitcases";
import {se} from "date-fns/locale";
import NewSuitcaseModal from "@/app/components/suitcases/NewSuitcaseModal";
import AddArticleToSuitcaseModal from "@/app/components/suitcases/AddArticleToSuitcaseModal";

interface AddArticleToSuitcaseProps {
    article: Article;
}

const AddArticleToSuitcase = ({ article }: AddArticleToSuitcaseProps) => {
    const [isSelectingSuitcase, setIsSelectingSuitcase] = useState<boolean>(false)
    const [isCreatingSuitcase, setIsCreatingSuitcase] = useState<boolean>(false)
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
                setUnsavedSuitcaseSelections(data) // `unsaved` should at least have the saved suitcases
            })
    }, [])

    const saveSelections = () => {
        addOrRemoveArticleToSuitcase(article.id, unsavedSuitcaseSelections || [])
            .then((data) => {
                const ids = data?.map((selection) => selection.suitcase_id)
                setSavedSuitcaseSelections([...ids])
            })

    }

    const openOrCloseModal = () => {
        // If `isSelectingSuitcase` is currently true, that means we're closing the modal right now.
        // When closing the modal, we want to clear any selections the user made but didn't save.
        if (isSelectingSuitcase) setUnsavedSuitcaseSelections(savedSuitcaseSelections)

        setIsSelectingSuitcase(!isSelectingSuitcase)
    }

    // TODO: this is still not working. it doesn't reflect the change until you refresh
    const handleSubmit = () => {
        saveSelections()
        openOrCloseModal()
    }

    return (
        <>
            <div className="h-12 w-12 bg-theme-light-green rounded-full p-2 drop-shadow-md">
                <Image
                    src={"/luggage-icon.png"}
                    alt={"luggage icon"}
                    width="30" height="30"
                    onClick={() => openOrCloseModal()}
                />
            </div>
            {isSelectingSuitcase &&
                <AddArticleToSuitcaseModal
                    setIsSelectingSuitcase={setIsSelectingSuitcase}
                    article={article}
                    suitcases={suitcases || []}
                    unsavedSuitcaseSelections={unsavedSuitcaseSelections || []}
                    setUnsavedSuitcaseSelections={setUnsavedSuitcaseSelections}
                    setIsCreatingSuitcase={setIsCreatingSuitcase}
                    handleSubmit={handleSubmit}
                />
            }
            {isCreatingSuitcase && <NewSuitcaseModal setIsOpen={setIsCreatingSuitcase} setSuitcases={setSuitcases}/>}
        </>
    )
}

export default AddArticleToSuitcase;