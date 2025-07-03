import { TouchableOpacity, Text, Image, Alert } from "react-native"
import { Button } from "../../public/styles";
import { useState, useEffect } from "react";
import React from "react";
import { FavorType } from "../type/common";
import { AxiosCall  } from "../common/common";
import { API_IP_INFO } from "../common/apiUrl";

const FavorStartCp = (props : FavorType) => {

    const [favorYn, setFavorYn] = useState(false);

    const FavorButtonClick = () => {
        if ( props.userId === null ) 
        {
            Alert.alert("로그인이  필요합니다.");
            props.navigation.navigate('login');
            return;
        } 
        else {
            const param = {
                userid : props.userId,
                statNm : props.statNm
            }

            if ( favorYn )
            {
                AxiosCall("DELETE", `${API_IP_INFO}/subway/subway-favor-del`, param, function ( data : number ) {
                    
                        Alert.alert("즐겨 찾기에서 삭제 되었습니다.");
                        setFavorYn(false);
                    
                    
                },);
            }
            else 
            {
                AxiosCall("PUT", `${API_IP_INFO}/subway/subway-favor-put`, param, function ( data : number ) {
                    
                        Alert.alert("즐겨 찾기에 추가 되었습니다.");
                        setFavorYn(true);
                    
                },);
            }

        }
    }

    useEffect(() => {
                const param = 
                {   
                    userid : props.userId,
                    statNm : props.statNm
                };
                AxiosCall("GET", `${API_IP_INFO}/subway/subway-favor-info`, param, function ( data : any ) {

                    if ( data.length > 0 ) 
                    {
                        setFavorYn(true);
                    } else {
                        setFavorYn(false);
                    }
                },)
    },[]);
    
    return (
        <TouchableOpacity  style={Button.SubWayNameConent} onPress = {(element) => FavorButtonClick() }>
                                                        {
                                                           ( favorYn === false || favorYn === null ) ? <Image style={Button.SubWayNameImage} source={require("../../public/images/blackstar.png")}></Image> : <Image style={Button.SubWayNameImage} source={require("../../public/images/star.png")}></Image>
                                                        }
                                                        <Text style={Button.BtnText}>즐겨찾기</Text>
        </TouchableOpacity >
    )
}


export const FavorStarCompo = React.memo(FavorStartCp);