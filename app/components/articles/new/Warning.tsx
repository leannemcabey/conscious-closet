import Image from "next/image";

const Warning = () => {
    return (
        <div className="fixed bottom-0 left-0 flex items-center space-x-1 mb-2.5 bg-theme-light-gold p-3 rounded-tr-lg animate-enter-from-left">
            <div className="w-[30px] h-[30px]">
                <Image
                    src="/warning-gold.gif"
                    height="30"
                    width="30"
                    alt="warning"
                    className="w-full self-center"
                />
            </div>
            <p className="text-sm w-[225px] text-neutral-600">
                Your photo won't be stored. Be sure not to delete it from Google Photos.
            </p>
        </div>
    )
}

export default Warning;