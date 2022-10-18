import { check, fail } from 'k6';
import http from 'k6/http';

export function response_status_check(res){
    if (
        !check(res, {
            "status code was 200": (res) => res.status == 200,
        })
    ) {
        fail('status code was *not* 200 actual status was ' + res.status);
    }
}

export function login_and_generate_authtoken(user, pass){
    // Login Post Request
    http.post('https://localhost:44353/api/sso/authenticate', JSON.stringify({
            username: user,
            password: pass,
        }), {headers: {'Content-Type': 'application/json'}}
    );

    // Generate Token
    const token = http.get('https://localhost:44353/api/sso/token');
    check(token, { 'logged in successfully': () => token !== '' });

    return JSON.parse(token.body)['accessToken'];
}

// Get config
export function getConfig() {
    try {
        return JSON.parse(open(`/config/${__ENV.CONFIG}`));
    }
    catch (err) {
        throw new Error("Please set a config file using -e CONFIG=config/{appropriate-config-file}");
    }
}

// Get Virtual User Credentials
export function getCredentials() {
    try {
        return JSON.parse(open(`/data/${__ENV.CREDENTIALS}`));
    }
    catch (err) {
        throw new Error("Please set a credentials file using -e CREDENTIALS=data/{appropriate-credentials-file}");
    }
}

let credentials = getCredentials();

// Generate Auth Token
export function getAuthToken() {
    let creds = credentials[Math.floor(Math.random() * credentials.length)];
    return token = login_and_generate_authtoken( creds.username, creds.password )
}

// Set header and return as 'params'
export function getHeader() {
    return params = {
        headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'content-type': 'application/json'
        },
    };
}
