import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, 
});

let getAccessToken = () => null;

export function registerAccessTokenGetter(getter) {
    getAccessToken = getter;
}

// Public endpoints that should NEVER have an Authorization header attached.
// Sending a stale/invalid Bearer token on these requests causes the API Gateway
// to reject the request with 401 before it even reaches the auth service.
const PUBLIC_PATHS = [
    '/authenticateusercredentials',
    '/authenticateadmincredentials',
    '/userregistration',
    '/refreshtoken',
    '/checkifemailexists',
    '/verifyotp',
];

axiosInstance.interceptors.request.use((config) => {
    const url = config.url || '';
    const isPublic = PUBLIC_PATHS.some(path => url.includes(path));

    if (!isPublic) {
        const token = getAccessToken() || localStorage.getItem('hcb_jwt_token') || localStorage.getItem('hcb_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default axiosInstance;