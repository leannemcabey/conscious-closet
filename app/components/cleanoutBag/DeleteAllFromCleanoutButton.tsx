'use client'
import IconButton from "@/app/components/buttons/IconButton";
import * as React from "react";
import { useState } from "react";
import DeleteAllFromCleanoutConfirmationModal
    from "@/app/components/cleanoutBag/DeleteAllFromCleanoutConfirmationModal";
import {deleteAllFromCleanoutBag} from "@/app/server-actions/cleanout-bag/deleteAllFromCleanoutBag";
import ErrorModal from "@/app/components/modal/ErrorModal";

interface DeleteAllFromCleanoutButtonProps {
    disabled: boolean
}

const DeleteAllFromCleanoutButton = ({ disabled }: DeleteAllFromCleanoutButtonProps) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const errorMessage = "An error occurred when deleting these articles. Please try again."

    const deleteAllAndResetData = () => {
        deleteAllFromCleanoutBag()
            .then(() => {
                // setCleanoutBagArticles([])
                setIsDeleting(false)
            })
            .catch(() => setError(true))
    }

    return (
        <>
            <IconButton
                handleClick={() => setIsDeleting(true)}
                isActive={!disabled}
                iconPath={disabled ? "/trash-icon-gray.svg" : "/trash-icon-white.svg"}
                iconAlt="trash icon"
                disabled={disabled}
            />

            {isDeleting && <DeleteAllFromCleanoutConfirmationModal setIsDeleting={setIsDeleting} handleSubmit={deleteAllAndResetData}/>}

            {error && <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />}
        </>
    )
}

export default DeleteAllFromCleanoutButton;