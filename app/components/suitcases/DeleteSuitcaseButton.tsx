'use client'
import Image from "next/image";
import { useState } from "react";
import DeleteSuitcaseConfirmationModal from "@/app/components/suitcases/DeleteSuitcaseConfirmationModal";
import IconButton from "@/app/components/buttons/IconButton";

interface DeleteSuitcaseButtonProps {
    suitcaseId: string;
}

const DeleteSuitcaseButton = ({ suitcaseId }: DeleteSuitcaseButtonProps) => {
    const [deletingSuitcase, setDeletingSuitcase] = useState<boolean>(false);

    return (
        <>

            <IconButton
                handleClick={() => setDeletingSuitcase(true)}
                isActive={true}
                iconPath="/trash-icon-white.svg"
                iconAlt="delete icon"
            />

            {deletingSuitcase && <DeleteSuitcaseConfirmationModal setIsOpen={setDeletingSuitcase} suitcaseId={suitcaseId} />}
        </>
    )
}

export default DeleteSuitcaseButton;