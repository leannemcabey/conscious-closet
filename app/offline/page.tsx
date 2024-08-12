import * as React from "react";
import { Metadata } from "next";
import OfflineContainer from "@/app/components/OfflineContainer";

export const metadata: Metadata = {
    title: "Offline",
};

export default async function Offline() {
    return (
        <OfflineContainer />
    );
};
