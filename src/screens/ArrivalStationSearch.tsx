import { Text, View, Alert, TouchableOpacity, TextInput, ActivityIndicator  } from "react-native";
import { Button, TextInputCss, Comm } from "../../public/styles";
import { BtnContainer } from "../component/Container";
import { useCallback, useState } from "react";
import SubWayInfo from "../component/SubWayInfo";
import { AxiosCall  } from "../common/common";
import { API_IP_INFO } from "../common/apiUrl";
import { ArrivalInfo } from "../type/common";
import { useSelector  } from "react-redux";
import { FavorStarCompo } from "../component/FavorStarCompo";
import { rootState    } from "../common/utils/reducer/index";
import { Button_Tochable_style, Text_Input_Style } from "../../public/styled_compo";

const ArrivalStationSearch = ( { route, navigation } : any ) => {
    const [subName, setSubName] = useState<string | undefined>('');
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [arvalInfo, setArvalInfo] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const { id, connected_at } = useSelector((state: rootState)=> state.userReducer);

    const onChangeSubWayName = useCallback(( text : string ) => {
        setSubName(text);
    },[subName]);

    const ButtonClick = useCallback(() => {

        const param = 
        {
            statNm : subName
        };

        const lineList = function () {
            setLoading(true);
            return new Promise( resolve => 
                AxiosCall("GET", `${API_IP_INFO}/subway/subway-info`, param, function ( data : any ) {
                    if ( data.length === 0 ) {
                        Alert.alert("해당 역에 대한 정보가 없습니다.");
                        setArvalInfo(false);
                        setLoading(false);
                        return;
                    }
                    resolve(data);
                },)
            );
        };
         
         const subWaySearch = async function(lineList : any) {
                return await new Promise( resolve => { AxiosCall("GET", `http://swopenapi.seoul.go.kr/api/subway/576e49415564627733364f744f5166/json/realtimeStationArrival/0/100/${subName}`, null, function (data) {
                        
                        let arrivalInfo:Array<ArrivalInfo> = [];
                        lineList.map((lineInfo : any) => {
                            
                            
                            const { SUBWAY_ID, LINE_NUM, afterStationNm, preStationNm } = lineInfo;

                            if ( SUBWAY_ID === null ||  SUBWAY_ID === undefined ) 
                            {
                                return;
                            } 
                            if ( data?.realtimeArrivalList === undefined || data?.realtimeArrivalList.length === 0  ) 
                            {
                                arrivalInfo.push(Object.assign({}, {
                                            LINE_NUM : LINE_NUM,
                                           SUBWAY_ID : SUBWAY_ID,
                                      afterStationNm : afterStationNm,
                                        preStationNm : preStationNm,
                                           upArrival : [],
                                         downArrival : [],
                                             subName : subName
                                }));
                                return;
                            }
                            else 
                            {
                                
                                const list = data?.realtimeArrivalList;
                                const upArrival   = list.filter((v : { subwayId : number, updnLine : string, btrainSttus : string }) => Number(SUBWAY_ID) === Number(v.subwayId)  && v.updnLine === '상행' )
                                                        .map   ((v : { bstatnNm : string, arvlMsg2 : string, btrainSttus : string }) => { return { bstatnNm : v.bstatnNm, arvlMsg2 : v.arvlMsg2, btrainSttus : v.btrainSttus }});
                                const downArrival = list.filter((v : { subwayId : number, updnLine : string, btrainSttus : string }) => Number(SUBWAY_ID) === Number(v.subwayId)  && v.updnLine === '하행' )
                                                        .map   ((v : { bstatnNm : string, arvlMsg2 : string, btrainSttus : string }) => { return { bstatnNm : v.bstatnNm, arvlMsg2 : v.arvlMsg2, btrainSttus : v.btrainSttus }});


                                arrivalInfo.push(Object.assign({}, {
                                            LINE_NUM : LINE_NUM,
                                           SUBWAY_ID : SUBWAY_ID,
                                      afterStationNm : afterStationNm,
                                        preStationNm : preStationNm,
                                           upArrival : [...upArrival],
                                         downArrival : [...downArrival],
                                             subName : subName,
                                }));
                            }
                             
                        });

                      resolve(arrivalInfo);
                });
            });
        }
        
        lineList().then((lineList : any) => {
            return subWaySearch(lineList);
        }).then((result : any) => {
            setArvalInfo(result);
            setLoading(false);
        }).catch((error) => {
            Alert.alert("에러가 발생했습니다.");
            setLoading(false);
        });
         
    },[subName]);

    if ( loading ) {
            return (
            <View style={Comm.loading}>
                <ActivityIndicator size="large" />
            </View>
            );
    }
    
    return (
        <>
            <BtnContainer>
                    <View style={Button.btnInnerDiv}>
                        <Text_Input_Style
                            style={[isFocus && { backgroundColor : "#B3CDFF" }]}
                            onChangeText={(text : string) => onChangeSubWayName(text)} 
                            onFocus ={ (e) => setIsFocus(!isFocus)}
                            value={subName}
                            placeholder="역명을 입력해주세요."
                            autoComplete="email"
                            textContentType="emailAddress"
                            width={'150px'}
                            height={'42px'}
                        />
                       <Button_Tochable_style width={'80px'} height={'50px'} onPress = {(element) => ButtonClick() }><Text style={Button.Btn_1_Text}>검색</Text></Button_Tochable_style>
                        {
                            ( arvalInfo )  &&  <FavorStarCompo userId={id} statNm={subName} navigation={navigation}></FavorStarCompo>
                                             
                        }
                    </View>
                        <SubWayInfo arvalInfo={arvalInfo} ></SubWayInfo>
            </BtnContainer>
        </>
    )
};

export default ArrivalStationSearch;
