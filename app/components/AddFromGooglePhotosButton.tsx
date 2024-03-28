import * as React from "react";
import { Dispatch, FC, SetStateAction } from "react";
import Image from "next/image";

interface AddFromGooglePhotosButtonProps {
    setIsSelecting: Dispatch<SetStateAction<boolean>>
}

export const AddFromGooglePhotosButton: FC<AddFromGooglePhotosButtonProps> = ({ setIsSelecting }) => {
    return (
        <button
            className="h-fit w-100 flex flex-row py-2 px-4 bg-white rounded-md drop-shadow-md w-max focus:outline-none focus:ring focus:ring-violet-300"
            onClick={() => setIsSelecting(true)}
        >
            <Image src="/google-photos-icon.png" height="40" width="40" alt="Google Photos icon"/>
            <p className="ml-4 self-center text-xl">Add from Google Photos</p>
        </button>
    )
};