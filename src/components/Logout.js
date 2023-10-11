import {useEffect} from "react";
import axios from "axios";
import { API_URL } from "../constants";

function Logout() {

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.post(API_URL + 'logout/',{
                    refresh_token:localStorage.getItem('refresh_token')
                } ,{headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }}, {withCredentials: true});

                console.log('logout', data)
                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                window.location.href = '/login'
            } catch (e) {
                console.log('logout not working')
            }
        })();
    }, []);

    return (
        <div></div>
    )
}

export default Logout;