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
                    <h1 className="text-lg mb-8 mr-2">suitcases</h1>
                    <div>
                        <Image
                            src={"/suitcase.svg"}
                            alt={"suitcase icon"}
                            width="25"
                            height="25"
                        />
                    </div>
                </div>
                <SuitcaseList />
            </div>
        </Layout>
    )
};