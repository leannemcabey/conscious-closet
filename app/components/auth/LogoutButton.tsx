export const LogoutButton = () => (
    <form action="/auth/logout" method="post">
        <button
            className="py-1 px-2 rounded-md no-underline text-sm text-theme-green bg-background-green drop-shadow"
        >
            Sign out
        </button>
    </form>
)

