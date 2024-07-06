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
            <div className="text-xl flex space-x-4 mb-6">
                <Image src={imageSrc} height="16" width="22" alt={imageAltText}/>
                <h2>{label}</h2>
            </div>
        </Link>
    )
}

export default MenuItem;