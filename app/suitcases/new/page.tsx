'use server'
import Layout from "@/app/components/Layout";
import { useState } from "react";
import {createSuitcase} from "@/app/server-actions/createSuitcase";
import NewSuitcaseModal from "@/app/components/suitcases/NewSuitcaseModal";
import BackButton from "@/app/components/navigation/BackButton";

export default async function NewSuitcase() {

    return (
        <Layout>
            <BackButton />
            <p>New Suitcase</p>
            <NewSuitcaseModal />
        </Layout>
    )
}