import TextButton from "@/app/components/buttons/TextButton";

export const LogoutButton = () => (
    <form action="/auth/logout" method="post">
        <TextButton disabled={false} handleClick={() => {}}>
            sign out
        </TextButton>
    </form>
)

