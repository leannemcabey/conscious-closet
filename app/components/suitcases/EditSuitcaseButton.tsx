'use client'
import Image from "next/image";
import { useState } from "react";
import EditSuitcaseModal from "@/app/components/suitcases/EditSuitcaseModal";
import { Suitcase } from "@/types/suitcase";

interface EditSuitcaseButtonProps {
    suitcase: Suitcase;
}

const EditSuitcaseButton = ({ suitcase }: EditSuitcaseButtonProps) => {
    const [editingSuitcase, setEditingSuitcase] = useState<boolean>(false);

    return (
        <>
            <div
                onClick={() => setEditingSuitcase(true)}
                className="p-2 rounded-full border border-theme-green bg-white drop-shadow w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
            >
                <Image
                    src={"/pen.svg"}
                    alt={"edit"}
                    width="40"
                    height="40"
                    className="w-full"
                />
            </div>

            {editingSuitcase && <EditSuitcaseModal setIsOpen={setEditingSuitcase} suitcase={suitcase} />}
        </>
    )
}

export default EditSuitcaseButton;