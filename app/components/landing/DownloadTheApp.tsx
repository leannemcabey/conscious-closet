import Image from "next/image";
import * as React from "react";

const DownloadTheApp = () => {
    return (
        <div className="mt-4 w-full bg-white py-8 flex flex-col justify-center items-center text-center bg-white md:py-4 lg:py-4">
            <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[50px] lg:h-[50px]">
                <Image
                    src={`/conscious-closet-logo.svg`}
                    height="40"
                    width="40"
                    alt="conscious closet logo"
                    className="w-full"
                />
            </div>
            <p className="text-lg text-theme-green tracking-widest mt-1 mb-2 md:mb-4">Download the app</p>
            <div className="text-base space-y-2">
                <div className="flex space-x-1 items-center">
                    <div className="w-[40px] h-[40px]">
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