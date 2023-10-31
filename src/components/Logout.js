import {useEffect} from "react";
import axios from "axios";
import { API_URL } from "../constants";
import Loading from "./Loading.js";

function Logout() {

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post(`${API_URL}logout/`,{
                    refresh_token:localStorage.getItem('refresh_token')
                } ,{headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }}, {withCredentials: true});

                console.log('logout', response.data)
                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                window.location.href = '/login/'
            } catch (e) {
                console.log('logout not working')
            }
        })();
    }, []);

    return (
        <Loading/>
    )
}

export default Logout;