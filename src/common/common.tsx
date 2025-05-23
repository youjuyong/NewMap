import { Alert } from "react-native";

export const Apirequest = async ( url : string, callBack : (data : any) => void ) => {
    const response = await fetch(
        url
    ,
    {
        method: 'GET',
    },
    );
    
    if (response.status === 200) {
        const responseJson = await response.json();
        callBack(responseJson);
    } else {
        Alert.alert("데이터를 불러 오지 못했습니다.");
        return;
    // throw new Error('unable to get');
    }
};