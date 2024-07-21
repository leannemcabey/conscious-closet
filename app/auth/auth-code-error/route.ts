import {NextRequest} from "next/server";

export async function AuthCodeError(req: Request) {
    console.log(`auth error page: ${JSON.stringify(req)}`)
}