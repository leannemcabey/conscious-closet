import Image from "next/image";

interface SaveButtonProps {
    disabled?: boolean;
    handleClick: () => void;
}

const SaveButton = ({ disabled, handleClick }: SaveButtonProps) => {
    return (
        <button
            className="pt-4 self-end"
            disabled={disabled}
            onClick={() => handleClick()}
        >
            <Image
                src={disabled ? "/check-mark-button-gray.svg" : "/check-mark-button-green.svg"}
                height={40}
                width={40}
                alt="save"
            />
        </button>
    )
}

export default SaveButton;