export const LogoutButton = () => (
    <form action="/auth/logout" method="post">
        <button
            className="py-1 px-2 rounded-md no-underline text-sm md:text-lg text-text-green border border-theme-green drop-shadow"
        >
            sign out
        </button>
    </form>
)

