import { Text, View, Pressable, ScrollView, Keyboard, FlatList, Image, TouchableWithoutFeedback  } from "react-native";
import { Section, Comm, ImageStyles, RouteColor, Var_Color } from "../../public/styles";
import { useCallback } from "react";
import React from "react";
import { ArrivalInfo } from "../type/common";

type props = {
    setIsFocus : ( e: boolean ) => void,
    arvalInfo  : Array<ArrivalInfo>,
}
const SubWayInfoCompo = ( props : props ) => {
    
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
            <View key={ SUBWAY_ID + 'itemContainer'} style={Comm.itemContainer}>
                <View key={ SUBWAY_ID + 'subWayName'} style={[Comm.subWayName ]}>
                    <Text style={Comm.centerLine}>{subName}</Text>
                </View>
                <View key={SUBWAY_ID + 'preArivalName'} style={[Comm.preArivalName,  RouteColor[SUBWAY_ID]  ]}>
                    <Image source={require("../../public/images/subway_left.png")} style={ImageStyles.arrivalLeftImg}></Image>
                    <Text  style={Comm.line}>{afterStationNm}</Text></View>
                <View key={SUBWAY_ID + 'afterArivalName'} style={[Comm.afterArivalName, RouteColor[SUBWAY_ID] ]}>
                    <Image source={require("../../public/images/subway_right.png")} style={ImageStyles.arrivalRightImg}></Image>
                    <Text  style={Comm.rightLine}>{preStationNm}</Text>
                </View>
                <View key={ SUBWAY_ID + 'info_cntainer'} style={Comm.info_cntainer}>
                     <View key={ SUBWAY_ID + 'left_info_cntainer'} style={Comm.left_info_cntainer}>
                         {
                           downArrival?.length > 0 ? downArrival.map((v: any, index : number) => {
                                const key     = SUBWAY_ID + 'downArrival_info_cntain4' + index;

                                return(
                                    <View key={key}>
                                         <Text style={[Comm.info_cntainer_text, Var_Color.blue500]}>{downArrival[index]['bstatnNm']} 방면</Text>
                                         <Text style={[Comm.info_cntainer_text, Var_Color.puple300]}>{downArrival[index]['arvlMsg2']}</Text>
                                    </View>
                                )
                            })
                            : <><Text key={SUBWAY_ID + 'ridsadr'} style={Comm.info_cntainer_text}>대기중</Text><Text style={Comm.info_cntainer_text}>정보없음</Text></> 
                        }
                    </View>
                    <View key={ SUBWAY_ID + 'right_info_cntainer' } style={Comm.right_info_cntainer}>
                         {
                           upArrival?.length > 0 ? upArrival.map((v: any, index : number) => {
                                const key     = SUBWAY_ID + 'upArr24' + index;
                                return(
                                    <View key={key}>
                                        <Text  style={[Comm.info_cntainer_text, Var_Color.blue500]}> {upArrival[index]['bstatnNm']} 방면</Text>
                                        <Text  style={[Comm.info_cntainer_text, Var_Color.puple300]}>{upArrival[index]['arvlMsg2']}</Text>
                                    </View>
                                )
                            })
                            :  <><Text style={Comm.info_cntainer_text}>대기중</Text><Text style={Comm.info_cntainer_text}>정보없음</Text></> 
                        } 
                    </View>
                </View>
            </View>
        )
    };
    
    return (
                    <View style={Section.SubWayInfo}>
                        <View style={Section.RouteTypeList}>
                             {
                                 ( props?.arvalInfo && props?.arvalInfo.length > 0 ) && props.arvalInfo.map((routeInfo : ArrivalInfo, index : number) => {
                                        const { SUBWAY_ID, LINE_NUM }  = routeInfo;
                                        
                                        if ( SUBWAY_ID === undefined) {
                                            return;
                                        }

                                        const key     = SUBWAY_ID + 'SubWayInfoView' + index;
                                        
                                        return(
                                                 <View key={key} style={[Section.RouteTypeInfo, RouteColor[SUBWAY_ID === undefined ? 9999 : SUBWAY_ID]]}>
                                                    <Text style={Section.RouteTextType}>{LINE_NUM}</Text>
                                                </View>
                                        )
                                    })
                            } 
                        </View>
                        
                            <View style={Section.SubWayInfoInner}>
                                    <FlatList
                                        data={props.arvalInfo}
                                        keyExtractor={(item, index) => item.LINE_NUM + index.toString()}
                                        renderItem={renderItem}
                                        contentContainerStyle={Comm.listContainer}
                                        nestedScrollEnabled ={true}
                                        /> 
                            </View>
                    </View>
    )
}

 const SubWayInfo = React.memo(SubWayInfoCompo);
 export default SubWayInfo;