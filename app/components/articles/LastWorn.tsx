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
    const [error, setError] = useState<boolean>();

    const errorMessage = "An error occurred when setting the last worn date for this article. Please try again."

    const selectWornDate = (selectedDate: Date) => {
        markArticleWornDate(article.id, selectedDate)
            .then(() => setDate(selectedDate))
            .catch(() => setError(true))
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="w-[100px] md:w-[180px]">
                    <Image src={"/last-worn.svg"} alt="last worn" width="100" height="30" className="w-full h-full"/>
                </div>

                <DatePicker
                    className="md:h-[50px] text-md md:text-2xl text-center py-1 w-full rounded-md drop-shadow focus:outline-none"
                    wrapperClassName="mt-1 w-[80%]"
                    popperPlacement="top-start"
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