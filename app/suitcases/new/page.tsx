'use server'
import Layout from "@/app/components/Layout";
import { useState } from "react";
import {createSuitcase} from "@/app/server-actions/createSuitcase";
import NewSuitcaseForm from "@/app/components/suitcases/NewSuitcaseForm";

export default async function NewSuitcase() {

    return (
        <Layout>
            <p>New Suitcase</p>
            <NewSuitcaseForm />
        </Layout>
    )
}