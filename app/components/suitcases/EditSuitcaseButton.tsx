'use client'
import Image from "next/image";
import { useState } from "react";
import EditSuitcaseModal from "@/app/components/suitcases/EditSuitcaseModal";
import { Suitcase } from "@/types/Suitcase";

interface EditSuitcaseButtonProps {
    suitcase: Suitcase;
}

const EditSuitcaseButton = ({ suitcase }: EditSuitcaseButtonProps) => {
    const [editingSuitcase, setEditingSuitcase] = useState<boolean>(false);

    return (
        <>
            <div
                onClick={() => setEditingSuitcase(true)}
                className="p-2 rounded-full border border-theme-light-green bg-white drop-shadow"
            >
                <Image
                    src={"/pencil-icon.svg"}
                    alt={"edit"}
                    width="20"
                    height="20"
                />
            </div>

            {editingSuitcase && <EditSuitcaseModal setIsOpen={setEditingSuitcase} suitcase={suitcase} />}
        </>
    )
}

export default EditSuitcaseButton;