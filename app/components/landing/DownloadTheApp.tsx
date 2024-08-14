import Image from "next/image";
import * as React from "react";

const DownloadTheApp = () => {
    return (
        <div className="mt-4 w-full bg-white py-8 flex flex-col justify-center items-center text-center bg-white">
            <div className="w-[40px] h-[40px] md:w-[70px] md:h-[70px]">
                <Image
                    src={`/conscious-closet-logo.svg`}
                    height="40"
                    width="40"
                    alt="conscious closet logo"
                    className="w-full"
                />
            </div>
            <p className="text-lg text-theme-green tracking-widest mt-1 mb-2 md:mb-4 md:text-2xl">Download the app</p>
            <div className="text-base space-y-2 md:text-xl">
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