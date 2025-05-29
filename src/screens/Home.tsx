
import { Image, Text, View, TouchableOpacity, useColorScheme } from 'react-native';
import { useCallback } from "react";
import { Header_Container, Section, ImageStyles } from "../../public/styles";
import { Colors } from 'react-native/Libraries/NewAppScreen';


const Home = ({ route, navigation } : any) => {
    const isDarkMode = useColorScheme() === 'dark';

    const ButtonClick = useCallback((element : any) => {
        navigation.navigate(element);
    },[]);
    
    return (
        <>
            <View style={Header_Container.divContainer}>
                <View style={Header_Container.divInnerContainer}>
                     <Image source={require("../../public/images/bus-icon.png")} style={ImageStyles.mainBoxImg}></Image>
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
                </TouchableOpacity >
                <TouchableOpacity  style={Section.mainBoxButton} onPress = {(element) => ButtonClick('arrivalStationSearch') }>
                    <Text style={Section.mainBoxText}>도착정보 조회</Text>
                </TouchableOpacity >
                {/* <TouchableOpacity  style={Section.mainBoxButton} ><Text style={Section.mainBoxText}>준비중</Text></TouchableOpacity >
                <TouchableOpacity  style={Section.mainBoxButton} ><Text style={Section.mainBoxText}>준비중</Text></TouchableOpacity > */}
                </View>
            </View>
        </>
    )
}

export default Home;