import { Text, View, TouchableOpacity, Image } from "react-native";
import { MyInfo_Styled } from "../../public/styles";
import { useSelector  } from "react-redux";
import { rootState    } from "../common/utils/reducer/index";
import { useDispatch  } from "react-redux";
import { user_clear } from "../common/utils/reducer/userInfo";

const MyInfo = ({ route, navigation } : any) => {
    const dispatch = useDispatch();
    const { id, connected_at, nickName } = useSelector((state: rootState)=> state.userReducer);

    const ButtonClick = () => {
            dispatch(user_clear());
            navigation.navigate('home');
    };

    return (
        <View style={MyInfo_Styled.rayout_1}>
            <View style={MyInfo_Styled.rayout_2}>
                <View style={MyInfo_Styled.imgRayout}>
                    <Image style={MyInfo_Styled.imgStyle} source={require("../../public/images/user.png")}></Image>
                </View>
                 <View style={MyInfo_Styled.titleRayout}>
                    <Text style={MyInfo_Styled.textStyled}>{ ( nickName !== null && nickName !== undefined ) ? nickName : id }님</Text>
                    <Text style={MyInfo_Styled.textStyled}>로그인 시간 : {connected_at}</Text>
                 </View>
                   <View style={MyInfo_Styled.logOutRayout}>
                    <TouchableOpacity  style={MyInfo_Styled.logoutBtnStyled} onPress = {(element) => ButtonClick() }>
                                        <Text style={MyInfo_Styled.textStyled}>로그아웃</Text>
                                    </TouchableOpacity >
                   </View>
            </View>
        </View>
    )
}

export default MyInfo;