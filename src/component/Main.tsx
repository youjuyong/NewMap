
import { Image, Text, View, TouchableOpacity, useColorScheme } from 'react-native';
import { useCallback } from "react";
import { Root_Css, Header_Container, Section } from "../../public/styles";
import { Colors } from 'react-native/Libraries/NewAppScreen';

const MainComponent = () => {
    const isDarkMode = useColorScheme() === 'dark';

      const ButtonClick = useCallback((element : any) => {
        console.log("test");
      },[]);
      
    return (
        <>
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
                <TouchableOpacity  style={Section.mainBoxButton} onPress = {(element) => ButtonClick(element) }>
                    <Text style={Section.mainBoxText}>현재 위치찾기</Text>
                    <Image style={Section.mainBoxLocImg} source={require("../../public/images/location_64.png")}></Image>
                </TouchableOpacity >
                <TouchableOpacity  style={Section.mainBoxButton} ><Text style={Section.mainBoxText}>준비중</Text></TouchableOpacity >
                <TouchableOpacity  style={Section.mainBoxButton} ><Text style={Section.mainBoxText}>준비중</Text></TouchableOpacity >
                <TouchableOpacity  style={Section.mainBoxButton} ><Text style={Section.mainBoxText}>준비중</Text></TouchableOpacity >
                </View>
            </View>
        </>
    )
}

export default MainComponent;