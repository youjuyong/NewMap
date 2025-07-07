import React, { useCallback } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { Header_Div  } from "../../public/styles";
import { useSelector  } from "react-redux";
import { rootState    } from "../common/utils/reducer/index";

const HeaderTabBar = ({ state, navigation  } : any) => {

    const { id, connected_at } = useSelector((state: rootState)=> state.userReducer);

    const ButtonClick = useCallback((element : any) => {
        if ( element === 'accdi' || element === 'alert' || element === 'search') {
            Alert.alert("준비중 입니다.");
            return;
        }
        if ( id !== null && element === 'login' ) 
        {
            navigation.navigate('myInfo');
        } else {
            navigation.navigate(element);
        }
    },[]);

    return (
        <View style={Header_Div.HeaderContainer}>
            <TouchableOpacity style={Header_Div.HeaderInner} onPress = {(element) => ButtonClick('accdi') }>
                 <Image style={Header_Div.HeaderImage} source={require("../../public/images/alert_icon.png")}></Image>
                <Text style={Header_Div.HeaderText}>돌발</Text></TouchableOpacity>
            <TouchableOpacity style={Header_Div.HeaderInner} onPress = {(element) => ButtonClick('alert') }>
                  <Image style={Header_Div.HeaderImage} source={require("../../public/images/notify_icon.png")}></Image>
                <Text style={Header_Div.HeaderText}>알림</Text></TouchableOpacity>
            <TouchableOpacity style={Header_Div.HeaderInner} onPress = {(element) => ButtonClick('search') }>
                <Image style={Header_Div.HeaderImage} source={require("../../public/images/search_icon.png")}></Image>
                <Text style={Header_Div.HeaderText}>검색</Text></TouchableOpacity>
            <TouchableOpacity style={Header_Div.HeaderInner} onPress = {(element) => ButtonClick('login') }>
                <Image style={Header_Div.HeaderImage} source={require("../../public/images/user_Icon.png")}></Image>
                <Text style={Header_Div.HeaderLoginText}>{id !== null ? '내정보' : '로그인' }</Text>
            </TouchableOpacity>
        </View>
    )
}


export default HeaderTabBar;