'use client'
import { useEffect, useState } from "react";
import { getSuitcases } from "@/app/server-actions/suitcase/getSuitcases";
import { Suitcase } from "@/types/suitcase";
import NewSuitcaseModal from "@/app/components/suitcases/NewSuitcaseModal";
import Link from "next/link";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import * as React from "react";
import NewButton from "@/app/components/buttons/NewButton";

const SuitcaseList = () => {
    const [suitcases, setSuitcases] = useState<Suitcase[]>()
    const [creatingSuitcase, setCreatingSuitcase] = useState<boolean>(false)
    const [error, setError] = useState<boolean>();

    const errorMessage = "An error occurred when retrieving your suitcases. Please go back and try again."

    useEffect(() => {
        getSuitcases()
            .then((suitcases) => {
                setSuitcases(suitcases)
            })
            .catch(() => setError(true))
    }, [])

    if (error) return <ErrorPageContainer errorMessage={errorMessage} />

    return (
        <div className="h-[97%] flex flex-col">
            <div className="fixed top-12 right-[9px] md:top-12">
                <NewButton handleClick={() => setCreatingSuitcase(true)}/>
            </div>

            {suitcases && suitcases?.length > 0 && (
                <div className="overflow-scroll pb-10 mx-2">
                    {suitcases.map((suitcase) =>
                        <Link href={`/suitcases/${suitcase.id}`} key={suitcase.id}>
                            <div
                                className="text-center tracking-widest text-neutral-800 w-full text-lg py-4 my-4 truncate bg-white rounded-lg drop-shadow md:text-2xl lg:text-lg">
                                {suitcase.name}
                            </div>
                        </Link>
                    )}
                </div>
            )}

            {suitcases && suitcases.length === 0 && (
                <p className="w-3/4 mt-20 text-center self-center text-xl text-neutral-400">
                    You don't have any suitcases yet.
                </p>
            )}

            {creatingSuitcase &&
                <NewSuitcaseModal
                    setIsOpen={setCreatingSuitcase}
                    suitcases={suitcases || []}
                    setSuitcases={setSuitcases}
                />
            }
        </div>
    )
}

export default SuitcaseList;