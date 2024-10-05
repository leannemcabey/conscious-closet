import * as React from "react";
import { useEffect, useState } from "react";
import { Suitcase } from "@/types/suitcase";
import { getSuitcases } from "@/app/server-actions/suitcase/getSuitcases";
import { addArticlesToSuitcases } from "@/app/server-actions/suitcase/addArticlesToSuitcases";
import ErrorModal from "@/app/components/modal/ErrorModal";
import AddArticleToSuitcaseModal from "@/app/components/suitcases/AddArticleToSuitcaseModal";
import NewSuitcaseModal from "@/app/components/suitcases/NewSuitcaseModal";
import Image from "next/image";
import Modal from "@/app/components/modal/Modal";
import IconButton from "@/app/components/buttons/IconButton";
import { CapsuleElementsMapType } from "@/types/CapsuleElementsMapType";
import SuccessModal from "@/app/components/modal/SuccessModal";

interface AddCapsuleToSuitcaseProps {
    capsuleElements: CapsuleElementsMapType;
}

const AddCapsuleToSuitcase = ({ capsuleElements }: AddCapsuleToSuitcaseProps) => {
    const [selectingSuitcase, setSelectingSuitcase] = useState<boolean>(false)
    const [creatingSuitcase, setCreatingSuitcase] = useState<boolean>(false);
    const [suitcases, setSuitcases] = useState<Suitcase[]>()
    const [unsavedSuitcaseSelections, setUnsavedSuitcaseSelections] = useState<string[]>();
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [fetchError, setFetchError] = useState<boolean>();
    const [updateError, setUpdateError] = useState<boolean>();

    const fetchErrorMessage = "An error occurred when retrieving your suitcases. Please try again."
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
        const articleIds = Array.from(capsuleElements.values()).map((element) => element.article?.id);

        if (unsavedSuitcaseSelections && articleIds) {
            addArticlesToSuitcases(articleIds, unsavedSuitcaseSelections)
                .then(() => {
                    setUnsavedSuitcaseSelections([])
                    setSelectingSuitcase(false)
                    setShowConfirmation(true)
                })
                .then(() => setTimeout(() => setShowConfirmation(false), 2000))
                .catch(() => {
                    setUpdateError(true)
                })
        }
    }

    return (
        <>
            <div className="self-center mb-2 mt-1">
                <IconButton
                    handleClick={() => openSuitcaseSelectionModal()}
                    isActive={true}
                    iconPath="/suitcase-white.svg"
                    iconAlt="suitcase icon"
                    colorOverride={{active: "bg-theme-green", inactive:"bg-theme-green"}}
                />
            </div>

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
                    setIsOpen={setCreatingSuitcase}
                    suitcases={suitcases || []}
                    setSuitcases={setSuitcases}
                />
            }

            {showConfirmation &&
                <SuccessModal setIsOpen={setShowConfirmation}>
                    <p className="text-xl mt-4">
                        Capsule added to suitcases(s)
                    </p>
                </SuccessModal>
            }
        </>
    )
}

export default AddCapsuleToSuitcase