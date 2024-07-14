'use client'
import Link from "next/link";

interface MenuSubItemProps {
    label: string;
    linkTo: string;
}

const MenuSubItem = ({ label, linkTo }: MenuSubItemProps) => {
    return (
        <Link href={linkTo}>
            <h3 className="text-sm truncate">{label}</h3>
        </Link>
    )
}

export default MenuSubItem;