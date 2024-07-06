'use server'
import Layout from "@/app/components/Layout";
import SuitcaseList from "@/app/components/suitcases/SuitcaseList";
import Image from "next/image";
import BackButton from "@/app/components/navigation/BackButton";

export default async function Suitcases() {
    return (
        <Layout>
            <BackButton />
            <div className="h-screen mt-8 mx-2 flex flex-col">
                <div className="flex justify-center">
                    <h1 className="text-2xl mb-8 mr-2">Suitcases</h1>
                    <div>
                        <Image
                            src={"/luggage-icon.png"}
                            alt={"luggage icon"}
                            width="30"
                            height="30"
                        />
                    </div>
                </div>
                <SuitcaseList />
            </div>
        </Layout>
    )
};