import Image from "next/image";

interface IconButtonProps {
    handleClick: () => void;
    isActive: boolean;
    iconPath: string;
    iconAlt: string;
}

const IconButton = ({handleClick, isActive, iconPath, iconAlt}: IconButtonProps) => {
    return (
        <div
            onClick={() => handleClick()}
            className={`flex justify-center p-2 rounded-full border border-theme-green rounded-lg ${isActive ? "bg-white" : "bg-background-green"} drop-shadow w-[40px] md:w-[60px]`}
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

export default IconButton;