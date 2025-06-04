import { Text, View, Image } from "react-native";
import { Header_Styles } from "../../public/styles";
import { Header } from "@react-navigation/stack";

const Login = ({ props } : any) => {

    return (
        <View style={Header_Styles.header_container}>
            <View style={[Header_Styles.header_Button, Header_Styles.kakao]}>
                    <Image></Image>
                    <Text style={Header_Styles.header_Button_Text}>카카오로 시작하기</Text>
            </View>
        </View>
    )
}

export default Login;