import BackButton from "@/app/components/buttons/BackButton";
import PageHeader from "@/app/components/PageHeader";
import SuitcaseList from "@/app/components/suitcases/SuitcaseList";

const SuitcasesPageContainer = () => {
    return (
        <>
            <BackButton />
            <div className="h-screen mt-8 mx-2 flex flex-col">
                <PageHeader title="suitcases" iconPath="/suitcase.svg" iconAlt="suitcase icon" />
                <SuitcaseList />
            </div>
        </>
    )
}

export default SuitcasesPageContainer;