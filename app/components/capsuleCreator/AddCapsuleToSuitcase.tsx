import * as React from "react";
import {useEffect, useState} from "react";
import {Suitcase} from "@/types/suitcase";
import {getSuitcases} from "@/app/server-actions/suitcase/getSuitcases";
import {addOrRemoveArticleToSuitcases} from "@/app/server-actions/suitcase/addOrRemoveArticleToSuitcases";
import addArticleToSuitcase from "@/app/components/suitcases/AddArticleToSuitcase";
import {addArticlesToSuitcases} from "@/app/server-actions/suitcase/addArticlesToSuitcases";
import ErrorModal from "@/app/components/modal/ErrorModal";
import AddArticleToSuitcaseModal from "@/app/components/suitcases/AddArticleToSuitcaseModal";
import NewSuitcaseModal from "@/app/components/suitcases/NewSuitcaseModal";
import Image from "next/image";
import Modal from "@/app/components/modal/Modal";

interface AddCapsuleToSuitcaseProps {
    selectedArticleIds: (string | undefined)[]
}

const AddCapsuleToSuitcase = ({ selectedArticleIds }: AddCapsuleToSuitcaseProps) => {
    const [selectingSuitcase, setSelectingSuitcase] = useState<boolean>(false)
    const [creatingSuitcase, setCreatingSuitcase] = useState<boolean>(false);
    const [suitcases, setSuitcases] = useState<Suitcase[]>()
    const [unsavedSuitcaseSelections, setUnsavedSuitcaseSelections] = useState<string[]>();
    // const [savedSuitcaseSelections, setSavedSuitcaseSelections] = useState<string[]>([]);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [fetchError, setFetchError] = useState<boolean>();
    const [updateError, setUpdateError] = useState<boolean>();

    const fetchErrorMessage = "An error occurred when retrieving your suitcases. Please go back and try again."
    const updateErrorMessage = "An error occurred when adding this capsule to your suitcase(s). Please try again."

    useEffect(() => {
        getSuitcases()
            .then((suitcases) => setSuitcases(suitcases))
            .catch(() => setFetchError(true))
    }, [])

    const openSuitcaseSelectionModal = () => {
        // clear out any previously encountered errors so they can try again
        setFetchError(false)
        setUpdateError(false)
        setSelectingSuitcase(true)
    }

    const saveSelections = () => {
        console.log(`selected articles: ${selectedArticleIds.length}`)
        console.log(`unsaved suitcases: ${unsavedSuitcaseSelections?.length}`)
        if (unsavedSuitcaseSelections) {
            addArticlesToSuitcases(selectedArticleIds, unsavedSuitcaseSelections)
                .then(() => {
                    setUnsavedSuitcaseSelections([])
                    setSelectingSuitcase(false)
                    setShowConfirmation(true)
                })
                .then(() => setTimeout(() => setShowConfirmation(false), 2000))
                .catch((error) => {
                    console.log(`error: ${error}`)
                    setUpdateError(true)
                })
        }
    }

    return (
        <>
            <button
                className="rounded-md bg-white border border-theme-light-green w-full py-1 mb-2 mt-1 drop-shadow text-theme-green"
                onClick={() => openSuitcaseSelectionModal()}
            >
                + add capsule to a suitcase
            </button>

            {selectingSuitcase && fetchError && <ErrorModal setIsOpen={setSelectingSuitcase} errorMessage={fetchErrorMessage} />}
            {selectingSuitcase && updateError && <ErrorModal setIsOpen={setSelectingSuitcase} errorMessage={updateErrorMessage} />}

            {selectingSuitcase && !fetchError && !updateError &&
                <AddArticleToSuitcaseModal
                    setIsSelectingSuitcase={setSelectingSuitcase}
                    setCreatingSuitcase={setCreatingSuitcase}
                    suitcases={suitcases || []}
                    unsavedSuitcaseSelections={unsavedSuitcaseSelections || []}
                    setUnsavedSuitcaseSelections={setUnsavedSuitcaseSelections}
                    handleSubmit={saveSelections}
                />
            }

            {creatingSuitcase &&
                <NewSuitcaseModal
                    isOpen={setCreatingSuitcase}
                    suitcases={suitcases || []}
                    setSuitcases={setSuitcases}
                />
            }

            {showConfirmation &&
                <Modal setIsOpen={setShowConfirmation}>
                    <div className="flex flex-col items-center text-center">
                        <Image unoptimized={true} src="/checkmark.gif" alt="success" height="200" width="200"/>
                        <p className="text-xl mt-4">
                            Capsule added to suitcases(s)
                        </p>
                    </div>
                </Modal>
            }
        </>
    )
}

export default AddCapsuleToSuitcase