import Link from "next/link";

const NewSuitcaseButton = () => {
    return (
        <Link href="/suitcases/new">
            <button className="p-2 bg-theme-blue rounded-md text-white">+</button>
        </Link>
    )
}

export default NewSuitcaseButton;