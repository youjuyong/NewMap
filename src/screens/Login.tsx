import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { Header_Styles,ImageStyles } from "../../public/styles";
import { Header } from "@react-navigation/stack";
import { WebView } from "react-native-webview";
import { user_login         } from "../common/utils/reducer/userInfo";
import { useDispatch } from "react-redux";
import { REDIRECT_URL } from "../common/apiUrl";
import { NAVER_REDIRECT_URL } from "../common/apiUrl";
import { client_id } from "../common/apiUrl";
import { client_secret } from "../common/apiUrl";
import { naver_client_id } from "../common/apiUrl";
import { naver_client_secret } from "../common/apiUrl";
import { useState, } from "react"; 
import { NaverAuthType, KakaoLoginProfileType } from "../type/common";
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
    const [naverShowLoginView, setNaverShowLoginView] = useState(false);

    // 카카오 로그인 인가
    const handleShouldStartLoad = ( event: any ) => {
        const url = event.url;
        const exp = "code=";
        const searchIdx = url.indexOf(exp);

        if (searchIdx !== -1) {
        const code = url.substring(searchIdx + exp.length);
        
            accessTokenHandler(code).then(( accessToken : any ) => {
                return userInfoHandler (accessToken);
            }).then((userInfo : any) => {
                console.log("useInfo", userInfo);
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

    // 카카오 로그인 버튼 클릭시
    const KakoButtonClick = ( e: boolean)  => {
        setShowLoginView(e);
    }

    // 네이버 로그인 버튼 클릭시
    const NaverButtonClick = ( e : boolean ) => {
        setNaverShowLoginView(e);
    }

    // 카카오 accessToken 핸들러
     const accessTokenHandler = async ( codeString : string ) => {

         return new Promise( async (resolve) => {
            const url = `https://kauth.kakao.com/oauth/token`;
            const body = qs.stringify({
                ...kakao,
                grant_type: `authorization_code`,
                code : codeString
            });

            const header :  any  = { 'content-type' : `application/x-www-form-urlencoded` };
            const response : any = await axios.post(url, body, header);
            const ACCESSTOKEN = response.data.access_token;

            resolve(ACCESSTOKEN);
         });

    }
    
    
    const userInfoHandler = async ( accessToken : string ) => {
        
        return new Promise( async (resolve) => {
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

      // 네이버 인가
      const naverCodeHandler = async ( state : NaverAuthType ) => {

        return new Promise ( async (resolve) => {

            let url = state?.url;
            let queryString     = url.split('?')[1];
            let queryParameters = queryString.split('&');

            const paramObj = queryParameters.map(( param : string ) => {
                const paramName  = param.split('=')[0]
                const paramValue = param.split('=')[1]
                return { [paramName]: paramValue }
            });
         
            const code = paramObj[0].code;

            resolve(code);
        });
      } 

      // 네이버 AccessToken 발급
      const naverAccessTokenHandler = async ( code : string ) => {

            const TOKEN_URL = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${naver_client_id}&client_secret=${naver_client_secret}&code=${code}&state=${encodeURIComponent("sunrise")}`;
            
            let result : any = await fetch( TOKEN_URL, {
                headers: { 'Content-Type': 'application/json' }
            });

            result = await result.json();
            const PROFILE_URL = "https://openapi.naver.com/v1/nid/me";
            result = await fetch(PROFILE_URL, {
                headers: {
                'Authorization': `Bearer ${result?.access_token}`,
                }
            });

            result = await result.json();
            const { response } = result;

            if (response) {
                    const info = {
                             id  : response?.id,
                    connected_at : String(new Date()),
                           token : null,
                        expireIn : null, 
                        nickName : response?.name,
                        masterYn : null
                    }
                dispatch(user_login(info));
                navigation.navigate('home');
                return false;
            }
      }

    const handleResponseFromNaverLogin =  ( state : any ) : boolean => {
            naverCodeHandler(state).then(( code : any ) => {
                    naverAccessTokenHandler(code);
                    return false;
            }).catch((error) => {
                Alert.alert("로그인 실패 했습니다.");
                return true;
            });

            return true;
    };
   
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

    if ( naverShowLoginView ) {
        return (
            <WebView className="flex"
                source={{
                    uri: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver_client_id}&state=${encodeURIComponent("sunrise")
        }&redirect_uri=${encodeURIComponent(NAVER_REDIRECT_URL)}`
                }}
                 scrollEnabled
              onShouldStartLoadWithRequest={(state) => handleResponseFromNaverLogin(state)}
            >
            </WebView>
        )
    }

  

    return (
        <View style={Header_Styles.header_container}>
            <TouchableOpacity style={[Header_Styles.header_Button, Header_Styles.kakao]} onPress={(element) => KakoButtonClick(true)}>
                    <Image source={require("../../public/images/kakao_logo.png")} style={ImageStyles.kakaoImg}></Image>
                    <Text style={Header_Styles.header_Button_Text}>카카오로 시작하기</Text>
            </TouchableOpacity>
             <TouchableOpacity style={[Header_Styles.header_Button, Header_Styles.naver]} onPress={(element) => NaverButtonClick(true)}>
                    <Image source={require("../../public/images/naver_logo.png")} style={ImageStyles.kakaoImg}></Image>
                    <Text style={Header_Styles.header_Button_Text}>네이버로 시작하기</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;