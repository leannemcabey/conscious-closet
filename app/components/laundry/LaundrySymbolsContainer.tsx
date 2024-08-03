'use client'
import LaundrySymbol from "@/app/components/laundry/LaundrySymbol";

const LaundrySymbolsContainer = () => {
    const headerStyling = "w-full sticky top-0 tracking-widest text-xl text-white bg-theme-blue rounded-md p-2";
    const symbolContainerStyling = "w-full grid grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-4";

    return (
        <div className="h-[90%] w-full overflow-scroll mt-8 flex flex-col items-center text-center space-y-4 md:space-y-10">
            <div className="w-full">
                <h2 className={headerStyling}>the basics</h2>
                <div className={symbolContainerStyling}>
                    <LaundrySymbol src="/normal-cycle.svg" label="machine wash"/>
                    <LaundrySymbol src="/hand-wash.svg" label="hand wash"/>
                    <LaundrySymbol src="/do-not-wash.svg" label="do not wash"/>
                    <LaundrySymbol src="/dry-clean-only.svg" label="dry clean only"/>
                    <LaundrySymbol src="/do-not-dry-clean.svg" label="do not dry clean"/>
                </div>
            </div>

            <div className="w-full">
                <h2 className={headerStyling}>wash cycle</h2>
                <div className={symbolContainerStyling}>
                    <LaundrySymbol src="/normal-cycle.svg" label="normal cycle"/>
                    <LaundrySymbol src="/permanent-press-cycle.svg" label="permanent press cycle"/>
                    <LaundrySymbol src="/gentle-cycle.svg" label="gentle cycle"/>
                </div>
            </div>

            <div className="w-full">
                <h2 className={headerStyling}>water temperature</h2>
                <div className={symbolContainerStyling}>
                    <LaundrySymbol src="/machine-wash-cold.svg" label="machine wash cold"/>
                    <LaundrySymbol src="/machine-wash-warm.svg" label="machine wash warm"/>
                    <LaundrySymbol src="/machine-wash-hot.svg" label="machine wash hot"/>
                </div>
            </div>

            <div className="w-full">
                <h2 className={headerStyling}>bleach</h2>
                <div className={symbolContainerStyling}>
                    <LaundrySymbol src="/bleach.svg" label="bleach"/>
                    <LaundrySymbol src="/non-chlorine-bleach.svg" label="non-chlorine bleach"/>
                    <LaundrySymbol src="/do-not-bleach.svg" label="do not bleach"/>
                </div>
            </div>

            <div className="w-full">
                <h2 className={headerStyling}>dry</h2>
                <div className={symbolContainerStyling}>
                    <LaundrySymbol src="/tumble-dry.svg" label="tumble dry"/>
                    <LaundrySymbol src="/do-not-tumble-dry.svg" label="do not tumble dry"/>
                    <LaundrySymbol src="/line-dry.svg" label="line dry"/>
                    <LaundrySymbol src="/flat-dry.svg" label="flat dry"/>
                    <LaundrySymbol src="/do-not-wring.svg" label="do not wring"/>
                </div>
            </div>

            <div className="w-full">
                <h2 className={headerStyling}>dry cycle</h2>
                <div className={symbolContainerStyling}>
                    <LaundrySymbol src="/tumble-dry.svg" label="tumble dry"/>
                    <LaundrySymbol src="/permament-press-cycle-dry.svg" label="permanent press cycle"/>
                    <LaundrySymbol src="/gentle-cycle-dry.svg" label="gentle cycle"/>
                </div>
            </div>

            <div className="w-full">
                <h2 className={headerStyling}>dry temperature</h2>
                <div className={symbolContainerStyling}>
                    <LaundrySymbol src="/low-heat-dry.svg" label="low heat dry"/>
                    <LaundrySymbol src="/medium-heat-dry.svg" label="medium heat dry"/>
                    <LaundrySymbol src="/high-heat-dry.svg" label="high heat dry"/>
                </div>
            </div>

            <div className="w-full">
                <h2 className={headerStyling}>ironing</h2>
                <div className={symbolContainerStyling}>
                    <LaundrySymbol src="/iron-low.svg" label="iron low heat"/>
                    <LaundrySymbol src="/iron-medium.svg" label="iron medium heat"/>
                    <LaundrySymbol src="/iron-high.svg" label="iron high heat"/>
                    <LaundrySymbol src="/do-not-iron.svg" label="do not iron"/>
                    <LaundrySymbol src="/do-not-steam.svg" label="do not steam"/>
                </div>
            </div>
        </div>
    )
}

export default LaundrySymbolsContainer;