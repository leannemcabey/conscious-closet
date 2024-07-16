'use client'
import Link from "next/link";

interface MenuSubItemProps {
    label: string;
    linkTo: string;
}

const MenuSubItem = ({ label, linkTo }: MenuSubItemProps) => {
    return (
        <Link href={linkTo}>
            <h3 className="w-max bg-background-green p-1 rounded-md text-sm truncate">{label}</h3>
        </Link>
    )
}

export default MenuSubItem;