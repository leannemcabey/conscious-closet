'use server'

export async function refreshGoogleProviderTokenWithRetry(refreshToken: string) {
    let attemptCounter = 0;
    return await refreshGoogleProviderToken(refreshToken, attemptCounter);
}

async function refreshGoogleProviderToken(refreshToken: string, attemptCounter: number) {
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
        console.log('calling google token endpoint')
        response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
    } catch(error) {
        console.log(`token endpoint threw error: ${error}`)
        if (attemptCounter > 2) {
            console.log(`max attempts for refreshing token reached. throwing error`)
            throw error
        } else {
            refreshGoogleProviderToken(refreshToken, attemptCounter)
        }
    }

    const data = await response.json();
    console.log(`awaited data: ${JSON.stringify(data)}`)
    return {
        token: data.access_token,
        expiresIn: data.expires_in
    }
}