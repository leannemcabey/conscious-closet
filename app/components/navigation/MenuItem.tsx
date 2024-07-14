import Image from "next/image";
import Link from "next/link";

interface MenuItemProps {
    linkTo: string;
    imageSrc: string;
    imageAltText: string;
    label: string;
}

const MenuItem = ({ linkTo, imageSrc, imageAltText, label }: MenuItemProps) => {
    return (
        <Link href={linkTo}>
            <div className="text-xl flex space-x-4 py-6 border border-dotted border-neutral-300 border-b-2 border-t-0 border-l-0 border-r-0">
                <Image src={imageSrc} width="28" height="28" alt={imageAltText}/>
                <h2>{label}</h2>
            </div>
        </Link>
    )
}

export default MenuItem;