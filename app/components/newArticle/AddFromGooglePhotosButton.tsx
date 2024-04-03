'use client'
import Image from "next/image";

export const AddFromGooglePhotosButton = () => {
    return (
        <button
            className="h-fit w-100 flex flex-row py-2 px-4 bg-white rounded-md drop-shadow-md w-max focus:outline-none focus:ring focus:ring-violet-300"
        >
            <Image src="/google-photos-icon.png" height="40" width="40" alt="Google Photos icon"/>
            <p className="ml-4 self-center text-xl">Add from Google Photos</p>
        </button>
    )
};