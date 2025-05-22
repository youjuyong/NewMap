import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import * as Location  from 'expo-location';
import KakaoMap from "../component/KakaoMap";
import { Section } from "../../public/styles";

const LocationSearch = ({ route, navigation } : any) => {

    const [location, setLocation] = useState<{ latitude : number, longitude : number} | null>(null);

    const getCurrentLocation = async (element ?: any) => {
      const { granted } = await Location.requestForegroundPermissionsAsync();
    
      if ( !granted ) 
      {
        return;
      } 
      else 
      {

        try {
                const { coords } = await Location.getCurrentPositionAsync({accuracy: 5});
                setLocation({latitude: coords.latitude, longitude: coords.longitude});
            } catch (error) {
                console.error('위치 정보를 가져오는 데 실패했습니다:', error)
            }
      }
    };

    useEffect(() => {
        getCurrentLocation();
    },[]);
    
    return (
      <View style={styles.container}>
             {location ? (
                <KakaoMap latitude={location.latitude} longitude={location.longitude} />
              ) : (
                  <Text>위치를 가져오는 중입니다...</Text>
            )}
             <TouchableOpacity  style={Section.current_loc} onPress = {(element) => getCurrentLocation(element)}><Text>새로고침</Text></TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height : 100,
    position : 'relative'
  },
});

export default LocationSearch;
