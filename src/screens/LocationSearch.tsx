import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from "react-native";
import { useState, useEffect, useCallback } from "react";
import * as Location  from 'expo-location';
import { Button, Comm } from "../../public/styles";
import NaverMap from "../../src/common/naverMap/NaverMap";
import { Button_Tochable_style } from '../../public/styled_compo';
import DropDownPicker from 'react-native-dropdown-picker';
import { Section } from "../../public/styles";
import { Subway_Object } from "../common/object";
import { API_IP_INFO } from "../common/apiUrl";
import { AxiosCall, trainStatHandler, upDownLineStatHandler } from "../common/common";
import { RouteSubWayInfo, SubwayArrivalInfo, RouteInfoState } from "../type/common";
import useRouteStore  from "../common/utils/store/useRouteStore";

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
                setRouteSubwayInfo({latitude: coords?.latitude, longitude: coords?.longitude, subWayInfoList : [], routeName : null });
            } catch (error) {
                console.error('위치 정보를 가져오는 데 실패했습니다:', error)
            }
      }
    };

    const ButtonClick = useCallback(( routeName : string ) => {
      if ( routeName !== undefined ) 
      { 
          setLoading(true);
          SubwayRouteList(routeName).then(( data ) => {
              return SubwayRouteArriveInfo(data, routeName);
          }).then((data) => {
              setRouteSubwayInfo({latitude : routeSubwayInfo?.latitude,longitude : routeSubwayInfo?.longitude , subWayInfoList : data, routeName : routeName });
              setLoading(false);
          }).catch((error) => {
            setLoading(false);
          });
      }
    },[routeSubwayInfo?.latitude, routeSubwayInfo?.longitude, routeSubwayInfo?.subWayInfoList]);
    
    /*
    *  호선별 도착정보 조회
    *
    */
    const SubwayRouteArriveInfo = async ( stationList : any, routeName : string ) => {

      return await new Promise( resolve => {

            AxiosCall("GET", 
                      `http://swopenapi.seoul.go.kr/api/subway/576e49415564627733364f744f5166/json/realtimePosition/0/100/${routeName.replaceAll('0','')}`,
                       null, 
                      function (data) {

              const { realtimePositionList, 
                                    status } = data;

              // 데이터가 없을 경우
              if ( status === 500 ) 
              {
                resolve(stationList);
                return;
              }
              // 상태 정상
              else 
              {
                stationList.length > 0 && stationList.map(( stInfo : RouteSubWayInfo, index : number ) => {
                  const { STATION_NM  } = stInfo;
                  
                  const  station_arrInfo = realtimePositionList.filter((v : { statnNm : string }) => v.statnNm.indexOf(STATION_NM) !== -1 )
                                                               .map((v : SubwayArrivalInfo ) => (
                                                                  { 
                                                                    trainSttus : trainStatHandler(v.trainSttus), 
                                                                    updnLine : upDownLineStatHandler(v.updnLine) ,
                                                                    statnTnm : v.statnTnm,
                                                                    statnId  : v.statnId
                                                                  }) 
                                                                );
                  stationList[index].subwayArrivalInfo = [...station_arrInfo];

                });
                resolve(stationList);
              }
            }, () => {
                setLoading(false);
            });
      });
    }

    const SubwayRouteList = async ( routeName : string ) => {
        return await new Promise( resolve => { 
            const param = {
              routeName : routeName
            }
         
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
          setRouteSubwayInfo({latitude: routeSubwayInfo?.latitude, 
                              longitude: routeSubwayInfo?.longitude, 
                              subWayInfoList : [], routeName : null});
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
                         dropDownDirection="BOTTOM"
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
                            listMode="MODAL"
                        />
                         <Button_Tochable_style width={'80px'} height={'50px'} onPress = {(element) => ButtonClick(value) }><Text style={Button.Btn_1_Text}>검색</Text></Button_Tochable_style>
                    </View>
            </View>
             { ( routeSubwayInfo?.latitude ) ? (
                  <NaverMap/>
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
  scroll_container : {
    flex: 1,
  }
});





export default LocationSearch;
