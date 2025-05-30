import React, { useCallback, useState }  from "react";
import { Text, View, StyleSheet, Alert, TouchableOpacity, TextInput, ActivityIndicator, ScrollView  } from "react-native";
import { Button, TextInputCss, Comm, Section } from "../../public/styles";
import { color } from "../../public/var";
import { AxiosCall    } from "../common/common";
import { BtnContainer } from "../component/Container";
import { API_IP_INFO  } from "../common/apiUrl";
import { SubWayInfo  } from "../type/common";
import DropDownPicker from 'react-native-dropdown-picker';

const TimeTableCompo = ({ route, navigation } : any) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([
      {id: '1', label: '[1]평일', value: '1'},
      {id: '2', label: '[2]토요일', value: '2'},
      {id: '3', label: '[3]휴일/일요일', value: '3'}
    ]);

    const [subName, setSubName] = useState<string | undefined>('');
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [timeTable, setTimeTable] = useState<any>();

    const onChangeSubWayName = useCallback(( text : string ) => {
            setSubName(text);
    },[subName]);
    
    const ButtonClick = useCallback(( value : number, subName : string | undefined) => {

      if ( subName === '' ) 
      {
        Alert.alert("역명을 입력해주세요.");
        return;
      } 
      else if 
      ( value === undefined )
      {
        Alert.alert("요일을 선택해주세요.");
        return;
      }

        const param = 
        {
              statNm : subName
        };

        const subWayInfo = function () {
            setLoading(true);
                  return new Promise( resolve => 
                      AxiosCall("GET", `${API_IP_INFO}/subway/subway-info`, param, function ( data : any ) {
                      
                      if ( data.length === 0 ) {
                          Alert.alert("해당 역에 대한 정보가 없습니다.");
                           setLoading(false);
                          return;
                      }
                      resolve(data);
                  },)
              );
         };

          const upTimeTableHandle = async function( subWayInfo : any ) {
            
                    const url = `http://openAPI.seoul.go.kr:8088/576e49415564627733364f744f5166/json/SearchSTNTimeTableByIDService/1/1000/${subWayInfo[0].STATION_CD}/${value}/1/`;
                     return await new Promise( resolve => { AxiosCall("GET", url, null, function (data) {

                                const { row, list_total_count } = data.SearchSTNTimeTableByIDService;

                                 if ( list_total_count === 0 ) 
                                 {
                                    subWayInfo.upDirTimeTalbleArr = [];
                                 }
                                 else 
                                 {
                                    const tableArr =  row.sort((a : any, b : any) => Number(a.ARRIVETIME.replace(/:/gi,"")  - Number(b.ARRIVETIME.replace(/:/gi,""))))
                                                       .filter((v : { ARRIVETIME : string }) => v.ARRIVETIME !== '00:00:00');
                                  
                                        tableArr.map((v : { ARRIVETIME : string, timeOverYn : boolean }, index : number) => {
                                            if( index !== 0 && tableArr.filter((v : any) => v?.["timeOverYn"] === true).length > 0 ) {
                                              return;
                                            }
                                            
                                            if ( dateFormat(v["ARRIVETIME"]) === 'R' ) 
                                            {
                                                v["timeOverYn"] = true;
                                            }
                                      
                                        });
                                    subWayInfo.upDirTimeTalbleArr = [...tableArr];
                                 
                                }
                               
         
                               resolve(subWayInfo);
                         });
                     });
          }

          const downTimeTableHandle = async function( subWayInfo : any ) {
            
                      const url = `http://openAPI.seoul.go.kr:8088/576e49415564627733364f744f5166/json/SearchSTNTimeTableByIDService/1/1000/${subWayInfo[0].STATION_CD}/${value}/2/`;
                     return await new Promise( resolve => { AxiosCall("GET", url, null, function (data) {

                                const { row, list_total_count } = data.SearchSTNTimeTableByIDService;

                                 if ( list_total_count === 0 ) 
                                 {
                                    subWayInfo.downDirTimeTalbleArr = [];
                                 }
                                 else 
                                 {
                                    
                                  const tableArr =  row.sort((a : any, b : any) => Number(a.ARRIVETIME.replace(/:/gi,"")  - Number(b.ARRIVETIME.replace(/:/gi,""))))
                                                       .filter((v : { ARRIVETIME : string }) => v.ARRIVETIME !== '00:00:00');
                                  
                                        tableArr.map((v : { ARRIVETIME : string, timeOverYn : boolean }, index : number) => {
                                            if( index !== 0 && tableArr.filter((v : any) => v?.["timeOverYn"] === true).length > 0 ) {
                                              return;
                                            }
                                            
                                            if ( dateFormat(v["ARRIVETIME"]) === 'R' ) 
                                            {
                                                v["timeOverYn"] = true;
                                            }
                                      
                                        });
                                    subWayInfo.downDirTimeTalbleArr = [...tableArr];
                                 }
                               
         
                               resolve(subWayInfo);
                         });
                     });
          }
                 
         subWayInfo().then((subwayInfo) => {
            return upTimeTableHandle(subwayInfo);
         }).then((dirUpinfo : any) => {
            return downTimeTableHandle(dirUpinfo);
         }).then((dirDownInfo : any) => {
            setTimeTable(dirDownInfo);
            setLoading(false);
         }).catch((error) => {
            Alert.alert("에러가 발생했습니다.");
            setLoading(false);
         });;

    },[]);

    if (loading) {
            return (
            <View style={Comm.loading}>
                <ActivityIndicator size="large" />
            </View>
            );
    }

    return (
          <View style={{flex: 1}}>
                 <View style={Button.timeSectionBtn}>
                    <View style={Section.timeBtnInnerDiv}>
                         <Text style={Section.timeDayWeekText}>요일(필수) : </Text>
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
                    </View>
                    <View style={Section.timeBtnInnerDiv}>
                        <TextInput
                                                        style={[TextInputCss.timeTxtInput, isFocus && { backgroundColor : "#B3CDFF" }]}
                                                        onChangeText={(text : string) => onChangeSubWayName(text)} // 콜백 삽입
                                                        onFocus ={ (e) => setIsFocus(!isFocus)}
                                                        value={subName} // value 연결
                                                        placeholder="역명을 입력해주세요."
                                                        autoComplete="email"
                                                        textContentType="emailAddress"
                        />
                        <TouchableOpacity  style={Button.SubWayNameBtn} onPress = {(element) => ButtonClick(value, subName) }><Text style={Button.BtnText}>검색</Text></TouchableOpacity >
                    </View>
                 </View>
                 <ScrollView style={{flex: 1}}>
                  <View style={Section.timeTableInnerDiv}>
                              <View style={Section.uptimeTableInnerDiv}>
                                    <View style={Section.DirTitleView}><Text style={[Section.DirTitleText,  { color : color.blue600 }]}>상행</Text></View>
                                    <View style={Section.DirContentView}>
                                        {
                                        (  timeTable?.upDirTimeTalbleArr !== undefined && timeTable?.upDirTimeTalbleArr !== null ) && timeTable.upDirTimeTalbleArr.map((timeInfo : any, index : number) => {
                                              const { ARRIVETIME, SUBWAYENAME, EXPRESS_YN, timeOverYn } = timeInfo;
                                              
                                              return (
                                                <Text key={timeInfo + index}style={ timeOverYn === true ? [ Section.DirContentText,{ color :  color.red500}] : Section.DirContentText }>{ARRIVETIME} {SUBWAYENAME} { EXPRESS_YN === 'G' ? '' : '(급행)'}</Text>
                                              )
                                          })
                                        }
                                    </View>
                              </View>
                                <View style={Section.downtimeTableInnerDiv}>
                                      <View style={Section.DirTitleView}><Text style={[Section.DirTitleText, { color : color.red600 }]}>하행</Text></View>
                                      <View style={Section.DirContentView}>
                                        {
                                        (  timeTable?.downDirTimeTalbleArr !== undefined && timeTable?.downDirTimeTalbleArr !== null ) && timeTable.downDirTimeTalbleArr.map((timeInfo : any, index : number) => {
                                            console.log("테이블 ", timeInfo)  ;
                                          const { ARRIVETIME, SUBWAYENAME, EXPRESS_YN, timeOverYn } = timeInfo;


                                              return (
                                                <Text key={timeInfo + index} style={ timeOverYn === true ? [ Section.DirContentText,{ color :  color.red500}] : Section.DirContentText }>{ARRIVETIME} {SUBWAYENAME} { EXPRESS_YN === 'G' ? '' : '(급행)'}</Text>
                                              )
                                          })
                                        }
                                    </View>
                              </View>
                  </View>
                 </ScrollView>
          </View>
    );
}

const date = new Date();
const dateFormat = (inputdate : string) => {
  	
	const yyyy = date.getFullYear();
	const mm = String(date.getMonth()+1).length === 1 ? '0' + ( date.getMonth() + 1) :  ( date.getMonth() + 1);
	const dd = date.getDate();

	const current = date.getTime();
  const time    = new Date(String(yyyy + '-' + mm + '-' + dd + ' ' + inputdate)).getTime();

  if ( Number(current) < Number(time) ) 
  {
    return 'R'
  } else {
    return 'F'
  }
	
}

const TimeTable = React.memo(TimeTableCompo);
export default TimeTable;