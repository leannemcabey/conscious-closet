'use client'
import { useState } from "react";
import EditSuitcaseModal from "@/app/components/suitcases/EditSuitcaseModal";
import { Suitcase } from "@/types/suitcase";
import IconButton from "@/app/components/buttons/IconButton";

interface EditSuitcaseButtonProps {
    suitcase: Suitcase;
}

const EditSuitcaseButton = ({ suitcase }: EditSuitcaseButtonProps) => {
    const [editingSuitcase, setEditingSuitcase] = useState<boolean>(false);

    return (
        <>
            <IconButton
                handleClick={() => setEditingSuitcase(true)}
                isActive={true}
                iconPath="/pen.svg"
                iconAlt="edit icon"
            />

            {editingSuitcase && <EditSuitcaseModal setIsOpen={setEditingSuitcase} suitcase={suitcase} />}
        </>
    )
}

export default EditSuitcaseButton;