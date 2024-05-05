'use client'
import { useState } from "react";
import { markArticleWornDate } from "@/app/server-actions/markArticleWornDate";
import { Article } from "@/types/Article";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

interface LastWornProps {
    article: Article
}

const LastWorn = ({ article }: LastWornProps) => {
    // const [updatedArticle, setUpdatedArticle] = useState<Article>(article)
    const initialLastWornDateValue = article.lastWorn ? new Date(article.lastWorn) : null;
    const [date, setDate] = useState<Date | null>(initialLastWornDateValue);

    const selectWornDate = (selectedDate: Date) => {
        markArticleWornDate(article.id, selectedDate)
            .then(() => setDate(selectedDate))
    }

    return (
        <div className="flex">
            <Image src={"/calendar-icon.png"} alt="calendar icon" width="25" height="25" />
            <p className="mx-2">Last Worn:</p>
            <DatePicker selected={date} onChange={(date: Date) => selectWornDate(date)} />
        </div>
    )
}

export default LastWorn;