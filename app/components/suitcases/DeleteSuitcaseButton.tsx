'use client'
import Image from "next/image";
import { useState } from "react";
import DeleteSuitcaseConfirmationModal from "@/app/components/suitcases/DeleteSuitcaseConfirmationModal";

interface DeleteSuitcaseButtonProps {
    suitcaseId: string;
}

const DeleteSuitcaseButton = ({ suitcaseId }: DeleteSuitcaseButtonProps) => {
    const [deletingSuitcase, setDeletingSuitcase] = useState<boolean>(false);

    return (
        <>
            <div
                onClick={() => setDeletingSuitcase(true)}
                className="p-2 rounded-full border border-theme-green bg-white drop-shadow w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
            >
                <Image
                    src={"/trash-icon.svg"}
                    alt={"delete"}
                    width="40"
                    height="40"
                    className="w-full"
                />
            </div>

            {deletingSuitcase && <DeleteSuitcaseConfirmationModal setIsOpen={setDeletingSuitcase} suitcaseId={suitcaseId} />}
        </>
    )
}

export default DeleteSuitcaseButton;