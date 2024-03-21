export const LogoutButton = () => (
    <form action="/auth/logout" method="post">
        <button
            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
            Logout
        </button>
    </form>
)

