import React, { useCallback } from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header_Div  } from "../../public/styles";

const HeaderTabBar = ({ state, navigation  } : any) => {

    const ButtonClick = useCallback((element : any) => {
        navigation.navigate(element);
    },[]);

    return (
        <View style={Header_Div.HeaderContainer}>
            <TouchableOpacity style={Header_Div.HeaderInner} onPress = {(element) => ButtonClick('tab1') }><Text style={Header_Div.HeaderText}>TEST1</Text></TouchableOpacity>
            <TouchableOpacity style={Header_Div.HeaderInner} onPress = {(element) => ButtonClick('tab2') }><Text style={Header_Div.HeaderText}>TEST1</Text></TouchableOpacity>
            <TouchableOpacity style={Header_Div.HeaderInner} onPress = {(element) => ButtonClick('tab3') }><Text style={Header_Div.HeaderText}>TEST1</Text></TouchableOpacity>
            <TouchableOpacity style={Header_Div.HeaderInner} onPress = {(element) => ButtonClick('login') }><Text style={Header_Div.HeaderText}>Login</Text></TouchableOpacity>
        </View>
    )
}


export default HeaderTabBar;