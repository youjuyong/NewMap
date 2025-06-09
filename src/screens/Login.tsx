import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { Header_Styles,ImageStyles } from "../../public/styles";
import { Header } from "@react-navigation/stack";
import { WebView } from "react-native-webview";
import { API_IP_INFO } from "../common/apiUrl";
import { user_login         } from "../common/utils/reducer/userInfo";
import { useDispatch       } from "react-redux";
import { REDIRECT_URL } from "../common/apiUrl";
import { client_id } from "../common/apiUrl";
import { client_secret } from "../common/apiUrl";


import { useState, } from "react"; 
import axios  from "axios";
import qs from "qs";

const kakao = {
    client_id,
    client_secret,
    redirect_url : REDIRECT_URL
}

const Login = ({ route, navigation } : any) => {
    const dispatch = useDispatch();
    const [showLoginView, setShowLoginView] = useState(false);

    const handleShouldStartLoad = (event: any) => {
    const url = event.url;
    const exp = "code=";
    const searchIdx = url.indexOf(exp);

    if (searchIdx !== -1) {
      const code = url.substring(searchIdx + exp.length);
      
        accessTokenHandler(code).then((accessToken : any) => {
            return userInfoHandler (accessToken);
        }).then((userInfo : any) => {
            const info = {
                      id  : userInfo.data.id,
             connected_at : userInfo.data.connected_at,
                    token : null,
                 expireIn : null, 
                 nickName : null,
                 masterYn : null
            }
            dispatch(user_login(info));
            navigation.navigate('home');
        }).catch((Error) => {
            Alert.alert("로그인 실패!");
            return;
        });
      return false;
    }
    return true;
  };
  
    const ButtonClick = ( e : any) => {
        console.log("버튼클릭");
        setShowLoginView(e);
    }

    // access_token Get
     const accessTokenHandler = async ( codeString : string ) => {

         return new Promise( async (resolve) => {
            const url = `https://kauth.kakao.com/oauth/token`;
            const body = qs.stringify({
                ...kakao,
                grant_type: `authorization_code`,
                code : codeString
            });

            const header:any  = { 'content-type' : `application/x-www-form-urlencoded` };
            const response:any = await axios.post(url, body, header);
            const ACCESSTOKEN = response.data.access_token;

            resolve(ACCESSTOKEN);
         });

    }
    
    
    const userInfoHandler = async ( accessToken : string ) => {
        
        return new Promise( async (resolve) => {
            console.log("userInfoHandler");
            const url = `https://kapi.kakao.com/v2/user/me`;
            const header = {
                headers : {
                    Authorization : `Bearer ${accessToken}`
                }
            };
            
            const response = await axios.get(url, header);
            
            resolve(response);
        });

    }
   
    if ( showLoginView ) {
        return (
            <WebView className="flex"
                source={{
                    uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${REDIRECT_URL}`,
                }}
                onShouldStartLoadWithRequest={handleShouldStartLoad}
            >
            </WebView>
        )
    }

    return (
        <View style={Header_Styles.header_container}>
            <TouchableOpacity style={[Header_Styles.header_Button, Header_Styles.kakao]} onPress={(element) => ButtonClick(true)}>
                    <Image source={require("../../public/images/kakao_logo.png")} style={ImageStyles.kakaoImg}></Image>
                    <Text style={Header_Styles.header_Button_Text}>카카오로 시작하기</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;