import { Alert } from "react-native";
import axios     from "axios";

export async function AxiosCall(requsetType: string, url: string, data: any, _callbackFunction ?: ((data: any) => void) | null,  _errorCallback ?: ((data: any) => void) | null, token ?: string | null | undefined ) {
    
    const options = {
        url: url,
        method: requsetType,
        params: data,
        headers: {
             "Content-Type": "multipart/form-data",
        },
        error : (data:any) => {
            console.log(data);
        }
    }
    console.log(options);
    await axios(options).then(response => {
        if ( response.status !== 200 ) {
            Alert.alert("에러가 발생했습니다.");
            return;
        }

        if (response.data != null) {
            _callbackFunction && _callbackFunction(response.data);
        }
    });
}


export async function requestFecth ( url : string ) {
    
    await fetch(url).then(function(response) {
        console.log(response);   
    }).catch(function (err) {
        console.log(err);
    });
}