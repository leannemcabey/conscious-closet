import Image from "next/image";
import Link from "next/link";

export default function WeatherCategories() {
    return (
        <div className="mt-5 mb-2 flex space-x-4">
            <Link href="/articles/weather/warm" className="drop-shadow">
                <Image src="/weather-icon-warm.svg" height="100" width="100" alt="warm weather icon" />
            </Link>

            <Link href="/articles/weather/mixed" className="drop-shadow">
                <Image src="/weather-icon-mixed.svg" height="100" width="100" alt="mixed weather icon" />
            </Link>

            <Link href="/articles/weather/cold" className="drop-shadow">
                <Image src="/weather-icon-cold.svg" height="100" width="100" alt="cold weather icon" />
            </Link>
        </div>
    )
};