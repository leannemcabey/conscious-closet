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
            <div className="flex flex-col items-center text-xl">
                <div className="flex space-x-2 justify-start mr-2 mt-1">
                    <Image src={"/calendar-icon.png"} alt="calendar icon" width="25" height="25" />
                    <p className="text-nowrap text-sm self-end">LAST WORN</p>
                </div>
                <DatePicker
                    className="text-center py-1 w-32 bg-background-green rounded-md drop-shadow focus:outline-none"
                    wrapperClassName="mt-1 w-32"
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