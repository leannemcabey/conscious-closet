'use client'
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface AddArticleToSuitcaseButtonProps {
    selectingSuitcase: boolean;
    setIsSelectingSuitcase:  Dispatch<SetStateAction<boolean>>;
}

const AddArticleToSuitcaseButton = ({ selectingSuitcase, setIsSelectingSuitcase }: AddArticleToSuitcaseButtonProps) => {
    return (
        <div
            onClick={() => setIsSelectingSuitcase(!selectingSuitcase)}
            className="h-12 w-12 bg-background-green border border-theme-blue rounded-full p-2 drop-shadow"
        >
            <Image
                src={"/luggage-icon.png"}
                alt={"luggage icon"}
                width="30" height="30"
            />
        </div>
    )
}

export default AddArticleToSuitcaseButton;