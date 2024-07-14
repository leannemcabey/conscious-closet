'use client'

import Image from "next/image";
import * as React from "react";

interface LaundrySymbolProps {
    src: string;
    label: string;
}

const LaundrySymbol = ({ src, label }: LaundrySymbolProps) => {
    return (
        <div className="flex flex-col items-center">
            <Image
                src={src}
                alt={label}
                width="75"
                height="75"
            />
            <p>{label}</p>
        </div>
    )
}

export default LaundrySymbol;