import { Text, View, StyleSheet, Alert, TouchableOpacity, TextInput, Keyboard  } from "react-native";
import { Button, TextInputCss } from "../../public/styles";
import { BtnContainer } from "../component/Container";
import { useCallback, useState } from "react";
import SubWayInfo from "../component/SubWayInfo";
import { Apirequest } from "../common/common";

const ArrivalStationSearch = ( { route, navigation } : any ) => {
    const [subName, setSubName] = useState<string | undefined>('');
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const onChangeSubWayName = useCallback(( text : string ) => {
        console.log("test");
        
        setSubName(text);
    },[subName]);

console.log(subName);
    const ButtonClick = useCallback(() => {
        const url = `http://swopenapi.seoul.go.kr/api/subway/576e49415564627733364f744f5166/json/realtimeStationArrival/0/5/${subName}`
        
        
         const lineList = function () {
            const sbwListUrl = `http://openapi.seoul.go.kr:8088/576e49415564627733364f744f5166/json/SearchSTNBySubwayLineInfo/1/5/%20/${subName}`;
            
            return new Promise( resolve => Apirequest(sbwListUrl, function (data) {
           
                const { list_total_count, row  } = data.SearchSTNBySubwayLineInfo;

                if ( list_total_count !== 0 ) {
                        resolve(row);
                }
            }));
        };
         
         const subWaySearch = function(fnCode : number) {
           
            const subwayInfo = `http://openapi.seoul.go.kr:8088/576e49415564627733364f744f5166/json/SearchSTNTimeTableByFRCodeService/1/5/${fnCode}/1/1/`;
            console.log(subwayInfo);
                return new Promise( resolve => { Apirequest(subwayInfo, function (data) {
                    console.log("data",data);
                    resolve(1);
                const { list_total_count, row  } = data.SearchSTNBySubwayLineInfo;
                    console.log("data",data);
                    if ( list_total_count !== 0 ) {
                            resolve(row);
                    }
                })
            });
        }

         lineList().then((lineList : any) => {
            
            lineList.map((lineInfo : { STATION_NM : string, FR_CODE : number }) => {
                return subWaySearch(lineInfo.FR_CODE);
            });
         }).then((data : any) => {
            console.log(data);
         });
         
    },[]);

    return (
        <>
           
           <BtnContainer>
                <View style={Button.btnInnerDiv}>
                    <TextInput
                        style={[TextInputCss.arrivalTxtInput, isFocus && { backgroundColor : "#E6F7DB" }]}
                        onChangeText={(text : string) => onChangeSubWayName(text)} // 콜백 삽입
                        onFocus ={ (e) => setIsFocus(!isFocus)}
                        value={subName} // value 연결
                        placeholder="지하철명을 입력해주세요."
                        autoComplete="email"
                        textContentType="emailAddress"
                    />
                     <TouchableOpacity  style={Button.SubWayNameBtn} onPress = {(element) => ButtonClick() }><Text style={Button.BtnText}>검색</Text></TouchableOpacity >
                </View>
                    <SubWayInfo setIsFocus={setIsFocus}></SubWayInfo>
           </BtnContainer>
        </>
    )
};

export default ArrivalStationSearch;
