import Image from "next/image";
import * as React from "react";

const DownloadTheApp = () => {
    return (
        <div className="bg-white border border-theme-green p-4 rounded-lg flex flex-col justify-center items-center text-center">
            <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]">
                <Image
                    src={`/conscious-closet-logo.svg`}
                    height="40"
                    width="40"
                    alt="conscious closet logo"
                    className="w-full"
                />
            </div>
            <p className="text-lg mt-2 mb-8">Download the app!</p>
            <div className="text-sm space-y-2">
                <div className="flex space-x-1">
                    <div className="w-[20px] h-[20px] md:w-[20px] md:h-[20px]">
                        <Image
                            src={`/download-arrow.svg`}
                            height="20"
                            width="20"
                            alt="download icon"
                            className="w-full"
                        />
                    </div>
                    <p>Click this icon in your web browser's search bar</p>
                </div>

                <div className="flex space-x-1">
                    <div className="w-[20px] h-[20px] md:w-[20px] md:h-[20px]">
                        <Image
                            src={`/add-to-homescreen.svg`}
                            height="20"
                            width="120"
                            alt="download icon"
                            className="w-full"
                        />
                    </div>
                    <p>Use the Add to Home screen option on mobile</p>
                </div >
            </div>
            <p className="mt-8 text-xs text-neutral-500">App store download coming soon!</p>
        </div>
    )
}

export default DownloadTheApp;