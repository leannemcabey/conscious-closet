export const LogoutButton = () => (
    <form action="/auth/logout" method="post">
        <button
            className="py-1 px-2 rounded-md no-underline text-sm text-black bg-slate-100 drop-shadow-sm"
        >
            Logout
        </button>
    </form>
)

