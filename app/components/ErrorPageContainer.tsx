'use client'
import Image from "next/image";
import * as React from "react";

interface ErrorPageContainerProps {
    errorMessage: string;
}

const ErrorPageContainer = ({ errorMessage }: ErrorPageContainerProps) => {
    return (
        <div className="flex justify-center">
            <div className="w-3/4 flex flex-col items-center text-center">
                <div>
                    <Image
                        src={"/warning-gold.gif"}
                        alt={"warning"}
                        width="100"
                        height="100"
                    />
                </div>
                <p className="text-2xl mb-2">Oops!</p>
                <p className="text-l">
                    {errorMessage}
                </p>
                <p className="text-xs text-neutral-400 my-2">
                    If the error persists, please contact us at leanne@consciouscloset.co.
                </p>
            </div>
        </div>
    )
}

export default ErrorPageContainer;