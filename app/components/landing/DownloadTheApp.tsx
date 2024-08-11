import Image from "next/image";
import * as React from "react";

const DownloadTheApp = () => {
    return (
        <div className="bg-white border border-theme-green p-4 rounded-lg flex flex-col justify-center items-center text-center">
            <div className="w-[40px] h-[40px] md:w-[80px] md:h-[80px]">
                <Image
                    src={`/conscious-closet-logo.svg`}
                    height="40"
                    width="40"
                    alt="conscious closet logo"
                    className="w-full"
                />
            </div>
            <p className="text-lg mt-2 mb-8 md:mb-12 md:text-3xl">Download the app!</p>
            <div className="text-base space-y-2 md:space-y-4 md:text-2xl">
                <div className="flex space-x-1 items-center">
                    <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]">
                        <Image
                            src={`/download-arrow.svg`}
                            height="20"
                            width="20"
                            alt="download icon"
                            className="w-full"
                        />
                    </div>
                    <p>From your web browser search bar</p>
                </div>

                <div className="flex space-x-1 items-center">
                    <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]">
                        <Image
                            src={`/add-to-homescreen.svg`}
                            height="20"
                            width="120"
                            alt="download icon"
                            className="w-full"
                        />
                    </div>
                    <p>Add to Home screen option on mobile</p>
                </div >
            </div>
            <p className="mt-8 text-xs text-neutral-500 md:text-lg md:mt-12">App store download coming soon!</p>
        </div>
    )
}

export default DownloadTheApp;