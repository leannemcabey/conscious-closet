import Image from "next/image";
import * as React from "react";

const DownloadTheApp = () => {
    return (
        <div className="bg-white border border-theme-green p-4 rounded-lg flex flex-col justify-center items-center text-center md:p-6">
            <div className="w-[40px] h-[40px] md:w-[80px] md:h-[80px]">
                <Image
                    src={`/conscious-closet-logo.svg`}
                    height="40"
                    width="40"
                    alt="conscious closet logo"
                    className="w-full"
                />
            </div>
            <p className="text-lg text-theme-green tracking-widest mt-4 mb-8 md:mb-12 md:text-3xl">Download the app</p>
            <div className="text-base space-y-2 md:space-y-4 md:text-2xl">
                <div className="flex space-x-1 items-center">
                    <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]">
                        <Image
                            src={`/add-to-homescreen.svg`}
                            height="20"
                            width="120"
                            alt="download icon"
                            className="w-full"
                        />
                    </div>
                    <div className="text-left">
                        <p>Add to Home screen from the triple</p>
                        <p>dot menu of your mobile browser</p>
                    </div>
                </div >
            </div>
        </div>
    )
}

export default DownloadTheApp;