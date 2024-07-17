import Image from "next/image";
import Link from "next/link";

export default function WeatherCategories() {
    return (
        <div className="mt-5 mb-2 flex space-x-4">
            <Link href="/articles/weather/warm" className="drop-shadow">
                <Image src="/warm-weather-icon.svg" height="150" width="150" alt="warm weather icon" />
            </Link>

            <Link href="/articles/weather/mixed" className="drop-shadow">
                <Image src="/mixed-weather-icon.svg" height="150" width="150" alt="mixed weather icon" />
            </Link>

            <Link href="/articles/weather/cold" className="drop-shadow">
                <Image src="/cold-weather-icon.svg" height="130" width="130" alt="cold weather icon" />
            </Link>
        </div>
    )
};