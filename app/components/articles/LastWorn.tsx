'use client'
import { useState } from "react";
import { markArticleWornDate } from "@/app/server-actions/article/markArticleWornDate";
import { Article } from "@/types/Article";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

interface LastWornProps {
    article: Article
}

const LastWorn = ({ article }: LastWornProps) => {
    const initialLastWornDateValue = article.lastWorn ? new Date(article.lastWorn) : null;
    const [date, setDate] = useState<Date | null>(initialLastWornDateValue);

    const selectWornDate = (selectedDate: Date) => {
        markArticleWornDate(article.id, selectedDate)
            .then(() => setDate(selectedDate))
    }

    return (
        <div className="w-full flex py-6 px-8 self-center items-center justify-center text-xl border border-white border-2 rounded-md">
            <div className="flex space-x-2 mr-2 mt-1">
                <div>
                    <Image src={"/calendar-icon.png"} alt="calendar icon" width="25" height="25" />
                </div>
                <p className="text-nowrap">Last Worn:</p>
            </div>
            <DatePicker
                className="text-center py-1 w-28 bg-white rounded-md drop-shadow focus:outline-none"
                wrapperClassName="ml-2 w-28"
                popperPlacement="top-start"
                dateFormat="M/d/YYYY"
                selected={date}
                onChange={(date: Date) => selectWornDate(date)}
            />
        </div>
    )
}

export default LastWorn;