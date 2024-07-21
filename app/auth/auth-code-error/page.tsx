export default async function AuthCodeError(req: Request) {
    return (
        <div className="h-screen flex flex-col place-content-center">
            <div className="h-[90%] m-4 border border-theme-green flex flex-col place-content-center text-center space-y-4">
                <p className="text-2xl">Oops!</p>
                <div className="text-xl">
                    <p>Something went wrong.</p>
                    <p>Try closing the app and logging in again.</p>
                </div>
                <p className="text-sm">If the problem persists, please contact leanne@consciouscloset.co.</p>
            </div>
        </div>
    )
}