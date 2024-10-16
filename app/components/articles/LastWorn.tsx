'use client'
import { useState } from "react";
import { markArticleWornDate } from "@/app/server-actions/article/markArticleWornDate";
import { Article } from "@/types/article";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import ErrorModal from "@/app/components/modal/ErrorModal";

interface LastWornProps {
    article: Article
}

const LastWorn = ({ article }: LastWornProps) => {
    const initialLastWornDateValue = article.lastWorn ? new Date(article.lastWorn) : null;
    const [date, setDate] = useState<Date | null>(initialLastWornDateValue);
    const [error, setError] = useState<boolean>(false);

    const errorMessage = "An error occurred when setting the last worn date for this article. Please try again."

    const selectWornDate = (selectedDate: Date) => {
        markArticleWornDate(article.id, selectedDate)
            .then(() => setDate(selectedDate))
            .catch(() => setError(true))
    }

    return (
        <>
            <div className="flex flex-col items-center w-full">
                <div className="flex justify-center w-[50%]">
                    <Image src={"/last-worn.svg"} alt="last worn" width="100" height="30" className="h-full"/>
                </div>

                <DatePicker
                    className="text-lg tracking-widest text-center py-1 w-full rounded-lg drop-shadow focus:outline-none"
                    wrapperClassName="mt-2 w-[50%] h-1/2"
                    popperPlacement="top"
                    dateFormat="M/d/YYYY"
                    selected={date}
                    onChange={(date: Date) => selectWornDate(date)}
                />
            </div>

            {error && <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />}
        </>
    )
}

export default LastWorn;