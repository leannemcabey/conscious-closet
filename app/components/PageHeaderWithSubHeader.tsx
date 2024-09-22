import { ReactElement } from "react";
import PageHeader from "@/app/components/PageHeader";
import * as React from "react";

interface PageHeaderWithSubHeaderProps {
    title: string;
    iconPath: string;
    iconAlt: string;
    children: ReactElement;
}

const PageHeaderWithSubHeader = ({ title, iconPath, iconAlt, children }: PageHeaderWithSubHeaderProps) => {
    return (
        <div className="flex flex-col mt-2 items-center">
            <PageHeader title={title} iconPath={iconPath} iconAlt={iconAlt} />

            <p className="mb-1 text-center w-[80%] text-neutral-400 text-sm md:text-lg">
                {children}
            </p>
        </div>
    )
}

export default PageHeaderWithSubHeader;