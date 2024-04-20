'use client'
import { useState } from "react";
import { markArticleWornDate } from "@/app/server-actions/markArticleWornDate";
import { Article } from "@/types/Article";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface LastWornProps {
    article: Article
}

const LastWorn = ({ article }: LastWornProps) => {
    // const [updatedArticle, setUpdatedArticle] = useState<Article>(article)
    const [date, setDate] = useState<Date>(new Date(article.lastWorn));

    const selectWornDate = (selectedDate: Date) => {
        markArticleWornDate(article.id, selectedDate)
            .then(() => setDate(selectedDate))
    }

    return (
        <>
            <p>Last Worn:</p>
            <DatePicker selected={date} onChange={(date: Date) => selectWornDate(date)} />
        </>
    )
}

export default LastWorn;