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

/*
*
* 열차 상태 함수
* 
*/
export const trainStatHandler = ( trainSttus : string ) => {

  let stat = '정보없음';

  switch ( trainSttus ) {
    case '0' : stat = '진입';
               break;
    case '1' : stat = '도착';
               break;
    case '2' : stat = '출발';
               break;
    case '3' : stat = '전역출발';
               break;
  }

  return stat;

}


/*
*
* 상행/하행 상태 함수
* 
*/
export const upDownLineStatHandler = ( trainSttus : string ) => {

  let stat = '정보없음';

  switch ( trainSttus ) {
    case '0' : stat = '상행/내선';
               break;
    case '1' : stat = '하행/외선';
               break;
  }

  return stat;

}