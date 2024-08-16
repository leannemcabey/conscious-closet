'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter();

    return (
        <div className="mb-2.5 w-[25px] h-[25px] md:mt-4 lg:mt-2">
            <Image
                src={"/left-arrow.svg"}
                alt={"Back arrow"}
                width={25}
                height={25}
                onClick={() => router.back()}
                className="w-full"
            />
        </div>
    )
};

export default BackButton;