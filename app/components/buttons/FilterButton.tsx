import Image from "next/image";

interface FilterButtonProps {
    handleClick: () => void;
    isActive: boolean;
    iconPath: string;
    iconAlt: string;
}

const FilterButton = ({handleClick, isActive, iconPath, iconAlt}: FilterButtonProps) => {
    return (
        <div
            onClick={() => handleClick()}
            className={`flex justify-center p-2 rounded-full border border-theme-blue rounded-full ${isActive && "bg-white"} drop-shadow w-[40px] md:w-[50px]`}
        >
            <Image
                src={iconPath}
                height={40}
                width={40}
                alt={iconAlt}
                className="w-full"
            />
        </div>
    )
}

export default FilterButton;