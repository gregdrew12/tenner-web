import axios from "axios";

// // Request interceptor for API calls
// axios.interceptors.request.use(
//     async config => {
//         console.log("Intercepting request")
//       config.headers = { 
//         'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
//         'Content-Type': 'application/json',
//       }
//       return config;
//     },
//     error => {
//       Promise.reject(error)
//   });

// Response interceptor for API calls
axios.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const response = await axios.post('http://localhost:8000/token/refresh/', {
            refresh:localStorage.getItem('refresh_token')
        },{
            headers: {
                'Content-Type': 'application/json',
            }
        },{withCredentials: true});  
                
        if (response.status === 200) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        }
        console.log(originalRequest.headers.Authorization)
        console.log(originalRequest.data)
        console.log(response.data.access)
        originalRequest.headers.Authorization = 'Bearer ' + response.data.access
        originalRequest.data = {'refresh_token':response.data.refresh}
        console.log(originalRequest.headers.Authorization)
        
        return axios(originalRequest);
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