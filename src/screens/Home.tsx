
import { Image, Text, View, TouchableOpacity, useColorScheme, useWindowDimensions, Alert } from 'react-native';
import { useCallback, useEffect, useState } from "react";
import { Header_Container, Section, ImageStyles } from "../../public/styles";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HeaderTabBar from "../component/HeaderTabBar";
import { useSelector  } from "react-redux";
import { rootState    } from "../common/utils/reducer/index";

const Home = ({ route, navigation } : any) => {

    const isDarkMode = useColorScheme() === 'dark';
    const { id, connected_at } = useSelector((state: rootState)=> state.userReducer);
    const {height, width, scale, fontScale} = useWindowDimensions();
   
    const ButtonClick = useCallback((screenName : any) => {
        if ( screenName === 'favorSubway' ) {

            if ( id === null || id === undefined )
                {
                    Alert.alert("로그인이 필요합니다.");
                    navigation.navigate('login');
                    return;
                } else {
                    navigation.navigate(screenName);
                }
        } else {
            navigation.navigate(screenName);
        }
     
    },[]);

    useEffect(() => {
         console.log(id, connected_at);
    },[]);

    return (
        <>
        <HeaderTabBar navigation={navigation}></HeaderTabBar>
            <View style={Header_Container.divContainer}>
                <View style={Header_Container.divInnerContainer}>
                    <Text style={Header_Container.textPTag}>𝙉𝙚𝙬𝙈𝙖𝙥</Text>
                </View>
            </View>
    
            <View
            style={[{
                backgroundColor: isDarkMode ? Colors.black : Colors.white
            }, Section.mainBoxDiv]}>
                <View style={Section.mainBoxInner}>
                    <TouchableOpacity  style={Section.mainBoxButton} onPress = {(element) => ButtonClick('locationSearch') }>
                        <Text style={Section.mainBoxText}>현재 위치찾기</Text>
                        <Image style={Section.mainBoxLocImg} source={require("../../public/images/location_64.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity  style={Section.mainBoxButton} onPress = {(element) => ButtonClick('arrivalStationSearch') }>
                        <Text style={Section.mainBoxText}>도착정보 조회</Text>
                        <Image style={Section.mainBoxLocImg} source={require("../../public/images/arrive_icon.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity  style={Section.mainBoxButton} onPress = {(element) => ButtonClick('timeTable') }>
                        <Text style={Section.mainBoxText}>시간표</Text>
                        <Image style={Section.mainBoxLocImg} source={require("../../public/images/timetable_icon.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity  style={Section.mainBoxButton} onPress = {(element) => ButtonClick('favorSubway') }>
                        <Text style={Section.mainBoxText}>즐겨찾기</Text>
                        <Image style={Section.mainBoxLocImg} source={require("../../public/images/favor_start_main.png")}></Image>
                    </TouchableOpacity> 
                </View>
            </View>
        </>
    )
}

export default Home;