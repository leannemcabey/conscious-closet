import Head from 'next/head'
import Image from 'next/image'
import GoogleSignIn from "@/app/components/auth/GoogleSignIn";

export default async function Index() {
    return (
        <div>
            <Head>
                <title>Conscious Closet</title>
                <link rel="icon" href="/cc-icon.svg"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,300;1,300&display=swap"
                      rel="stylesheet"/>
            </Head>

            <div className="flex justify-center min-h-screen max-h-screen relative">
                <Image priority src="/pexels-liza-summer-closet.jpg" fill style={{opacity: 0.4}}
                       alt="Photo of clothing on hangers by Liza Summer from Pexels"/>
                <div className="flex flex-col items-center self-center space-y-14 absolute">
                    <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl">
                        <span className="text-theme-green">CONSCIOUS</span> CLOSET
                    </h1>
                    <GoogleSignIn />
                </div>
            </div>
        </div>
    );
};
