'use client'
import IconButton from "@/app/components/buttons/IconButton";
import Link from "next/link";
import * as React from "react";

const CleanoutRecsButton = () => {
    return (
        <Link href="/cleanout/recommendations">
            <IconButton
                handleClick={() => {}}
                isActive={true}
                iconPath="/earth-white.svg"
                iconAlt="earth icon"
            />
        </Link>
    )
}

export default CleanoutRecsButton;