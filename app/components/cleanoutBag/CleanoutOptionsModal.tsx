'use client'
import Modal from "@/app/components/modal/Modal";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

interface CleanoutOptionsModalProps {
    setShowCleanoutOptions: Dispatch<SetStateAction<boolean>>;
}

interface CleanoutOption {
    name: string;
    url: string;
}

const CleanoutOptionsModal = ({ setShowCleanoutOptions }: CleanoutOptionsModalProps) => {
    const cleanoutOptions: CleanoutOption[] = [
        {name: "ThredUp", url: "https://www.thredup.com/cleanout"},
        {name: "SuperCircle", url: "https://www.supercircle.world/"},
        {name: "Trashie", url: "https://shop.trashie.io/products/take-back-bag"},
        {name: "Bottomless Closet", url: "https://bottomlesscloset.org/give-clothing-more/"},
        {name: "That Suits You", url: "https://www.thatsuitsyou.org/donate"},
        {name: "100 Suits for 100 Men", url: "https://www.100suitsnyc.org/programs"},
        {name: "Scrap", url: "https://www.scrapnyc.com/give"}
    ]

    return (
        <Modal setIsOpen={setShowCleanoutOptions}>
            <div className="text-center">
                <p className="text-xl">Don't throw these clothes out!</p>
                <p className="text-md font-bold">Thrift, donate, or recycle instead.</p>
                <div className="flex flex-col mt-4 space-y-1 h-44 overflow-scroll items-center">
                    {cleanoutOptions.map((option) => {
                        return (
                            <a
                                href={option.url}
                                target="_blank"
                                className="p-2 bg-theme-blue text-white rounded-md w-5/6"
                            >
                                {option.name}
                            </a>
                        )
                    })}
                </div>
                <p className="mt-4 text-sm">Know of another great company or organization? Email us @ <span className="font-bold">leanne@consciouscloset.co</span>!</p>
            </div>
        </Modal>
    )
}

export default CleanoutOptionsModal;