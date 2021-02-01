import axios from "axios"
import * as Config from "../api/ApiConfig";


function CallApi(endpoint,method = "GET", body) {
    return (
        axios({
            method:method,
            url: `${Config.API_URL}/${endpoint}`,
            data:body,
        })
        .catch(err => console.log(err))  
    );
}

export default CallApi;