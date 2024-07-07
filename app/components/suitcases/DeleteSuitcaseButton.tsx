'use client'
import Image from "next/image";
import { useState } from "react";
import DeleteSuitcaseConfirmationModal from "@/app/components/suitcases/DeleteSuitcaseConfirmationModal";

interface DeleteSuitcaseButtonProps {
    suitcaseId: string;
}

const DeleteSuitcaseButton = ({ suitcaseId }: DeleteSuitcaseButtonProps) => {
    const [deletingSuitcase, setDeletingSuitcase] = useState<boolean>();

    return (
        <>
            <div
                onClick={() => setDeletingSuitcase(true)}
                className="p-2 rounded-full border border-theme-light-green bg-white drop-shadow-md"
            >
                <Image
                    src={"/trash-icon.svg"}
                    alt={"delete"}
                    width="20"
                    height="20"
                />
            </div>

            {deletingSuitcase && <DeleteSuitcaseConfirmationModal setIsOpen={setDeletingSuitcase} suitcaseId={suitcaseId} />}
        </>
    )
}

export default DeleteSuitcaseButton;