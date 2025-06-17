import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect, useCallback } from "react";
import * as Location  from 'expo-location';
import { Button, Comm } from "../../public/styles";
import KakaoMap from "../component/KakaoMap";
import { Button_Tochable_style } from '../../public/styled_compo';
import DropDownPicker from 'react-native-dropdown-picker';
import { Section } from "../../public/styles";

const LocationSearch = ({ route, navigation } : any) => {

    const [location, setLocation] = useState<{ latitude : number, longitude : number} | null>(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([
      {id: '1', label: '[1]평일', value: '1'},
      {id: '2', label: '[2]토요일', value: '2'},
      {id: '3', label: '[3]휴일/일요일', value: '3'}
    ]);

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

    const ButtonClick = useCallback(( routeName : string ) => {
      Alert.alert("클릭");
    },[]);

    useEffect(() => {
        getCurrentLocation();
    },[]);
    
    if ( loading ) {
                return (
                <View style={Comm.loading}>
                    <ActivityIndicator size="large" />
                </View>
                );
    }

    return (
      <View style={styles.container}>
             <View style={Button.timeSectionBtn}>
                    <View style={Section.timeBtnInnerDiv}>
                         <Text style={Section.timeDayWeekText}>노선명 : </Text>
                         <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            containerStyle={[Comm.taimeTalbeSelectBox, { zIndex : 999999}]}
                            placeholder="선택"
                            selectedItemContainerStyle={{
                                backgroundColor: "#f5f5dc",
                            }}
                            listItemLabelStyle={{
                              color: "#00355A"
                            }}
                        />
                         <Button_Tochable_style width={'80px'} height={'50px'} onPress = {(element) => ButtonClick(value) }><Text style={Button.Btn_1_Text}>검색</Text></Button_Tochable_style>
                    </View>
            </View>
             { ( location ) ? (
                <KakaoMap latitude={location.latitude} longitude={location.longitude} />
              ) : (
                   <View style={Comm.loading}>
                    <ActivityIndicator size="large" />
                </View>
            )}
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
