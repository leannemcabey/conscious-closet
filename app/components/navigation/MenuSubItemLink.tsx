'use client'
import Link from "next/link";

export interface MenuSubItem {
    label: string;
    linkTo: string;
}

const MenuSubItemLink = ({ label, linkTo }: MenuSubItem) => {
    return (
        <Link href={linkTo} key={label}>
            <h3 className="w-max p-1 text-base truncate md:text-xl lg:text-sm">{label}</h3>
        </Link>
    )
}

export default MenuSubItemLink;