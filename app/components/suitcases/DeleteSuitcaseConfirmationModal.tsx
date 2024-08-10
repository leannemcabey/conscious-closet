'use client'
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";
import {Dispatch, SetStateAction, useState} from "react";
import { deleteSuitcase } from "@/app/server-actions/suitcase/deleteSuitcase";
import { useRouter } from "next/navigation";
import ErrorModal from "@/app/components/modal/ErrorModal";

interface DeleteSuitcaseConfirmationModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    suitcaseId: string;
}

const DeleteSuitcaseConfirmationModal = ({setIsOpen, suitcaseId}: DeleteSuitcaseConfirmationModalProps) => {
    const router = useRouter();
    const [error, setError] = useState<boolean>(false);

    const errorMessage = "An error occurred while trying to delete your suitcase. Please try again."

    const handleSubmit = () => {
        deleteSuitcase(suitcaseId)
            .then(() => router.back())
            .catch(() => setError(true))
    }

    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    return (
        <ConfirmationModal setIsOpen={setIsOpen} confirmAction={handleSubmit}>
            <p className="w-4/5 text-xl self-center text-center my-10 md:text-2xl">
                Are you sure you want to delete this suitcase?
            </p>
        </ConfirmationModal>
    )
}

export default DeleteSuitcaseConfirmationModal;