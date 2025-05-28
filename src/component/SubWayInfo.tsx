import { Text, View, StyleSheet, Alert, Pressable, TextInput, Keyboard, FlatList, Image  } from "react-native";
import { Section, Comm, ImageStyles, RouteColor, Var_Color } from "../../public/styles";
import { useCallback, useState } from "react";
import { ArrivalInfo } from "../type/common";

type props = {
    setIsFocus : ( e: boolean ) => void,
    arvalInfo  : Array<ArrivalInfo>,
}
const SubWayInfo = ( props : props ) => {
    
    const onPress = useCallback(( bol : boolean ) => {
        props.setIsFocus(false);
        Keyboard.dismiss(); 
    },[]);

    const renderItem = ( data : any ) => {
        if ( data?.item === undefined ) {
            return ( <></>);
        }
        const { SUBWAY_ID, afterStationNm, preStationNm, upArrival, downArrival, subName } = data?.item;
        
        return (
            <View style={Comm.itemContainer}>
                <View style={[Comm.subWayName ]}>
                    <Text style={Comm.centerLine}>{subName}</Text>
                </View>
                <View style={[Comm.preArivalName,  RouteColor[SUBWAY_ID]  ]}>
                    <Image source={require("../../public/images/subway_left.png")} style={ImageStyles.arrivalLeftImg}></Image>
                    <Text style={Comm.line}>{afterStationNm}</Text></View>
                <View style={[Comm.afterArivalName, RouteColor[SUBWAY_ID] ]}>
                    <Image source={require("../../public/images/subway_right.png")} style={ImageStyles.arrivalRightImg}></Image>
                    <Text style={Comm.rightLine}>{preStationNm}</Text>
                </View>
                <View style={Comm.info_cntainer}>
                    <View style={Comm.right_info_cntainer}>
                        {
                           upArrival?.length > 0 ? upArrival.map((v: any, index : number) => {
                            console.log(v);
                                return(
                                    <><Text key={SUBWAY_ID + 'info_cntainer'} style={[Comm.info_cntainer_text, Var_Color.blue500]}>{upArrival[index]['bstatnNm']} 방면</Text><Text key={SUBWAY_ID + 'info_cntainer2'} style={[Comm.info_cntainer_text, Var_Color.puple300]}>{upArrival[index]['arvlMsg2']}</Text></>
                                )
                            })
                            : <><Text style={Comm.info_cntainer_text}>대기중</Text><Text style={Comm.info_cntainer_text}>정보없음</Text></> 
                            // ( upArrival?.length > 0 && upArrival ) && upArrival.forEach((arriveInfo : any, index : number) => {
                            //     return(
                            //         <><Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{upArrival[index]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{upArrival[index]['arvlMsg2']}</Text></>
                            //     )
                            // })
                            // // upArrival.length === 1 ? <><Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{upArrival[0]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{upArrival[0]['arvlMsg2']}</Text></> :
                            // // upArrival.length === 2 ? <>
                            // //                             <Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{upArrival[0]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{upArrival[0]['arvlMsg2']}</Text>
                            // //                             <Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{upArrival[1]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{upArrival[1]['arvlMsg2']}</Text>
                            // //                          </> :
                            // // upArrival.length === 3 ? <>
                            // //                             <Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{upArrival[0]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{upArrival[0]['arvlMsg2']}</Text>
                            // //                             <Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{upArrival[1]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{upArrival[1]['arvlMsg2']}</Text>
                            // //                             <Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{upArrival[2]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{upArrival[1]['arvlMsg2']}</Text>
                            // //                          </> 
                            // <><Text style={Comm.info_cntainer_text}>대기중</Text><Text style={Comm.info_cntainer_text}>정보없음</Text></> 
                        }
                    </View>
                    <View style={Comm.left_info_cntainer}>
                         {
                           downArrival?.length > 0 ? upArrival.map((v: any, index : number) => {
                            console.log(v);
                                return(
                                    <><Text key={SUBWAY_ID + 'down_info_cntainer'} style={[Comm.info_cntainer_text, Var_Color.blue500]}>{downArrival[index]['bstatnNm']} 방면</Text><Text key={SUBWAY_ID + 'down_info_cntainer2'} style={[Comm.info_cntainer_text, Var_Color.puple300]}>{downArrival[index]['arvlMsg2']}</Text></>
                                )
                            })
                            : <><Text style={Comm.info_cntainer_text}>대기중</Text><Text style={Comm.info_cntainer_text}>정보없음</Text></> 
                            // ( upArrival?.length > 0 && upArrival ) && upArrival.forEach((arriveInfo : any, index : number) => {
                            //     return(
                            //         <><Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{upArrival[index]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{upArrival[index]['arvlMsg2']}</Text></>
                            //     )
                            // })
                            // // upArrival.length === 1 ? <><Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{upArrival[0]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{upArrival[0]['arvlMsg2']}</Text></> :
                            // // upArrival.length === 2 ? <>
                            // //                             <Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{upArrival[0]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{upArrival[0]['arvlMsg2']}</Text>
                            // //                             <Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{upArrival[1]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{upArrival[1]['arvlMsg2']}</Text>
                            // //                          </> :
                            // // upArrival.length === 3 ? <>
                            // //                             <Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{upArrival[0]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{upArrival[0]['arvlMsg2']}</Text>
                            // //                             <Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{upArrival[1]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{upArrival[1]['arvlMsg2']}</Text>
                            // //                             <Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{upArrival[2]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{upArrival[1]['arvlMsg2']}</Text>
                            // //                          </> 
                            // <><Text style={Comm.info_cntainer_text}>대기중</Text><Text style={Comm.info_cntainer_text}>정보없음</Text></> 
                        }
                         {/* {
                            downArrival.length === 1 ? <><Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{downArrival[0]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{downArrival[0]['arvlMsg2']}</Text></> :
                            downArrival.length === 2 ? <>
                                                        <Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{downArrival[0]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{downArrival[0]['arvlMsg2']}</Text>
                                                        <Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{downArrival[1]['bstatnNm']} 방면</Text><Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{downArrival[1]['arvlMsg2']}</Text>
                                                     </> :
                            <><Text style={Comm.info_cntainer_text}>대기중</Text><Text style={Comm.info_cntainer_text}>정보없음</Text></> 

                        } */}
                    </View>
                </View>
            </View>
        )
    };

    return (
                 <Pressable style={{width : '100%', height: '100%'}} onPress={() => onPress(false)}>
                    <View style={Section.SubWayInfo}>
                        <View style={Section.RouteTypeList}>
                            {
                                 ( props?.arvalInfo && props?.arvalInfo.length > 0 ) && props.arvalInfo.map((routeInfo : ArrivalInfo) => {
                                        const { SUBWAY_ID, LINE_NUM }  = routeInfo;
                                        
                                        if ( SUBWAY_ID === undefined) {
                                            return;
                                        }

                                        return(
                                            <>
                                                 <View key={SUBWAY_ID + 'SubWayInfoView'} style={[Section.RouteTypeInfo, RouteColor[SUBWAY_ID === undefined ? 9999 : SUBWAY_ID]]}><Text key={ SUBWAY_ID +  'SubWayInfoText'} style={Section.RouteTextType}>{LINE_NUM}</Text></View>
                                            </>
                                        )
                                    })
                            }
                        </View>
                        <View style={Section.SubWayInfoInner}>
                                 <FlatList
                                    data={props.arvalInfo}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={renderItem}
                                    contentContainerStyle={Comm.listContainer}
                                    />
                        </View>
                    </View>
                </Pressable>
    )
}

export default SubWayInfo;