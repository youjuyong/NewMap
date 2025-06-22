import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect, useCallback } from "react";
import * as Location  from 'expo-location';
import { Button, Comm } from "../../public/styles";
import KakaoMap from "../component/KakaoMap";
import { Button_Tochable_style } from '../../public/styled_compo';
import DropDownPicker from 'react-native-dropdown-picker';
import { Section } from "../../public/styles";
import { Subway_Object } from "../common/object";
import { API_IP_INFO } from "../common/apiUrl";
import { AxiosCall } from "../common/common";
import useRouteStore  from "../common/utils/store/useRouteStore";
import { RouteInfoState } from "../type/common";

const LocationSearch = ({ route, navigation } : any) => {
  
    const { routeSubwayInfo, setRouteSubwayInfo } : RouteInfoState= useRouteStore();
    const [open,       setOpen] = useState(false);
    const [value,     setValue] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [items,     setItems] = useState([...Subway_Object]);

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
                setRouteSubwayInfo({latitude: coords.latitude, longitude: coords.longitude, subWayInfoList : []});
            } catch (error) {
                console.error('위치 정보를 가져오는 데 실패했습니다:', error)
            }
      }
    };

    const ButtonClick = useCallback(( routeName : string ) => {
      if ( routeName !== undefined ) 
      {
          SubwayRouteList(routeName).then((data ) => {
            setRouteSubwayInfo({latitude : routeSubwayInfo?.latitude,longitude : routeSubwayInfo?.longitude , subWayInfoList : data });
            setLoading(false)
          }).catch((error) => {
            setLoading(false);
          });
      }
    },[routeSubwayInfo?.latitude, routeSubwayInfo?.longitude, routeSubwayInfo?.subWayInfoList]);
    
    const SubwayRouteArriveInfo = async ( stationList : any ) => {
      return await new Promise( resolve => {


      });
    }

    const SubwayRouteList = async ( routeName : string ) => {
        return await new Promise( resolve => { 
            const param = {
              routeName : routeName
            }
            setLoading(true);
            AxiosCall("GET", `${API_IP_INFO}/subway/subway-route-info`, param, function (data) {
              resolve(data);
            }, () => {
                setLoading(false);
            });
        });
    }

    useEffect(() => {
        getCurrentLocation();

        return () => {
          setRouteSubwayInfo({latitude: routeSubwayInfo.latitude, longitude: routeSubwayInfo.longitude, subWayInfoList : []});
        }
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
                            maxHeight={500}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            containerStyle={[Comm.taimeTalbeSelectBox, { zIndex : 999999, maxHeight : 1000}]}
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
             { ( routeSubwayInfo ) ? (
                  <KakaoMap/>
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
