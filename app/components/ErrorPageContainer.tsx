'use client'
import Image from "next/image";
import * as React from "react";

interface ErrorPageContainerProps {
    errorMessage: string;
}

const ErrorPageContainer = ({ errorMessage }: ErrorPageContainerProps) => {
    return (
        <div className="flex justify-center">
            <div className="w-3/4 flex flex-col items-center text-center space-y-8">
                <div>
                    <Image
                        unoptimized
                        src={"/warning-gold.gif"}
                        alt={"warning"}
                        width="100"
                        height="100"
                    />
                </div>
                <div>
                    <p className="text-2xl">Oops!</p>
                    <p className="text-lg">
                        {errorMessage}
                    </p>
                </div>
                <p className="text-xs text-neutral-400">
                    If the error persists, try logging out and back in again. If that doesn't work, please contact us at
                    <a
                        className="text-theme-blue"
                        href="mailto:leanne@consciouscloset.co"> leanne@consciouscloset.co
                    </a>.
                </p>
            </div>
        </div>
    )
}

export default ErrorPageContainer;