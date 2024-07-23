'use server'

let attemptCounter = 0;

export async function refreshGoogleProviderToken(refreshToken: string) {
    attemptCounter++

    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const clientId = process.env.GOOGLE_CLIENT_ID;

    const params = new URLSearchParams();
    params.append('refresh_token', refreshToken);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', 'refresh_token');
    params.append('scopes', 'email profile openid https://www.googleapis.com/auth/photoslibrary.readonly')

    let response;

    try {
        response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
    } catch(error) {
        if (attemptCounter > 1) throw error
        refreshGoogleProviderToken(refreshToken)
    }

    const data = await response.json();
    return {
        token: data.access_token,
        expiresIn: data.expires_in
    }
}