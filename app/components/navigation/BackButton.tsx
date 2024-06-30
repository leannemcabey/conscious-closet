'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter();

    return (
        <Image
            src={"/left-arrow.svg"}
            alt={"Back arrow"}
            width={25}
            height={25}
            onClick={() => router.back()}
        />
    )
};

export default BackButton;