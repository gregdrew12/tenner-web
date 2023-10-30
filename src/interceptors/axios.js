import axios from "axios";
import { API_URL } from "../constants";

let refreshPromise = false
const clearPromise = () => refreshPromise = null;

async function refreshToken() {
    const response = await axios.post(API_URL + 'token/refresh/', {
        refresh:localStorage.getItem('refresh_token')
    },{
        headers: {
            'Content-Type': 'application/json',
        }
    },{withCredentials: true});

    return response;
}

// // Request interceptor for API calls
// axios.interceptors.request.use(
//     async config => {
//         console.log("Intercepting request")
//       config.headers = { 
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'Authorization': 'Bearer ' + localStorage.getItem('access_token')
//       }
//       return config;
//     },
//     error => {
//       Promise.reject(error)
//     }
// );

// Response interceptor for API calls
axios.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            if (!refreshPromise) {
                refreshPromise = refreshToken().finally(clearPromise);
            }
            const response = await refreshPromise;
                    
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        
            originalRequest.headers.Authorization = 'Bearer ' + response.data.access
            if(originalRequest.data !== undefined) {
                originalRequest.data = {'refresh_token':response.data.refresh}
            }

            return axios(originalRequest);
        } catch (error) {
            console.log('Axios interceptor error: ' + error)
            if(error.status === 401) {
                window.location.href = '/login'
            }
        }
    }
    console.log(error.config)
    return Promise.reject(error);
});

// axios.defaults.baseURL = 'http://localhost:8000/api/';

// let refresh = false;

// axios.interceptors.response.use(resp => resp, async error => {
//     if (error.response.status === 401 && !refresh) {
//         refresh = true;
//         const response = await axios.post('http://localhost:8000/token/refresh/', {
//             refresh:localStorage.getItem('refresh_token')
//         }, {
//             headers: {
//               'Content-Type': 'application/json',
//             }
//           },{withCredentials: true});

//         if (response.status === 200) {
//             console.log(response.data.access)
//             console.log(response.data['access'])
//             axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
//             localStorage.setItem('access_token', response.data.access);
//             localStorage.setItem('refresh_token', response.data.refresh);

//             return axios(error.config);
//         }
//     }
//     refresh = false;
//     return error;
// });