'use client'
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { Article } from "@/types/article";
import ErrorModal from "@/app/components/modal/ErrorModal";
import Image from "next/image";
import Polaroid from "@/app/components/articles/Polaroid";
import { WeatherPicker } from "@/app/components/articles/new/WeatherPicker";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { ImageSelection } from "@/app/components/articles/new/ImageSelection";
import { createArticle } from "@/app/server-actions/article/createArticle";
import TextButtonFilled from "@/app/components/buttons/TextButtonFilled";
import IconButton from "@/app/components/buttons/IconButton";
import {undefined} from "zod";

interface NewArticleModalTwoProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NewArticleModalTwo = ({ setIsOpen }: NewArticleModalTwoProps) => {
    const [step, setStep] = useState<number>(1);

    return (
        <Modal setIsOpen={setIsOpen}>
            <>
                <CloseModalButton setIsOpen={setIsOpen} />

                {step === 1 && <p>step 1</p>}
                {step === 2 && <p>step 2</p>}
                {step === 3 && <p>step 3</p>}

                {step !== 3 && (
                    <IconButton
                        handleClick={() => setStep(step+1)}
                        isActive={true}
                        iconPath="/left-arrow-green.svg"
                        iconAlt="next"
                        iconRotation="rotate-180"
                    />
                )}

                {step === 3 && (
                    <div className="self-end mt-6 -mr-2 md:mt-10">
                        <TextButtonFilled handleClick={() => console.log("save")} disabled={false}>
                            save
                        </TextButtonFilled>
                    </div>
                )}
            </>
        </Modal>
    )
}

export default NewArticleModalTwo;