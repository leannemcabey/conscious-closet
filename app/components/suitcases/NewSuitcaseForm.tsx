'use client'
import { createSuitcase } from "@/app/server-actions/createSuitcase";
import { useState } from "react";

const NewSuitcaseForm = () => {
    const [suitcaseName, setSuitcaseName] = useState<string>("");

    return (
        <form onSubmit={() => createSuitcase(suitcaseName)} className="flex flex-col">
            <label>Trip Name:
                <input
                    type="text"
                    onChange={(e) => setSuitcaseName(e.target.value)}
                    className="border border-black"
                />
            </label>
            <button type="submit" className="rounded-md bg-theme-green w-max p-2 text-white">Create</button>
        </form>
    )
}

export default NewSuitcaseForm;