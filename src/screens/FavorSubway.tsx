import { Text, View, StyleSheet, Alert, FlatList, TouchableOpacity, Image ,TextInput, ActivityIndicator  } from "react-native";
import { Section, Comm } from "../../public/styles";
import { useCallback, useEffect, useState } from "react";
import { AxiosCall } from "../common/common";
import { API_IP_INFO } from "../common/apiUrl";
import { useSelector  } from "react-redux";
import { rootState    } from "../common/utils/reducer/index";

const FavorSubway = ({ route, navigation } : any) => {

    const [ stationList, setStationList] = useState(null);
    const { id, connected_at } = useSelector((state: rootState)=> state.userReducer);
    const [loading, setLoading] = useState(false);

    const lsitClick = ( statNm : string ) => {
        navigation.navigate('favorSubwayArriveInfo', { statNm : statNm });
    }

    const deleteClick = ( statNm : string ) =>  {
        const param = {
                userid : id,
                statNm : statNm
        }
        AxiosCall("DELETE", `${API_IP_INFO}/subway/subway-favor`, param, function ( data : number ) {
                                Alert.alert("즐겨 찾기에서 삭제 되었습니다.");
                                reload();
        },);
    }

    const renderFavorItem = ( data : any) => {
        if ( data?.item === undefined ) {
            return ( <></>);
        }
        const { SUBWAY_NAME } = data?.item;

        return (
              <View key={ SUBWAY_NAME + 'itemContainer'} style={Comm.favorItemConatiner}>
                 <View style={Comm.favorItemIn}>
                    <TouchableOpacity style={Comm.favorItemConatiner} onPress={(e) => lsitClick(SUBWAY_NAME)}>
                        <View style={Comm.favorItemImgContainer}>
                            <Image style={Comm.favorImgStar} source={require("../../public/images/star_big.png")}></Image>
                        </View>
                        <View style={Comm.favorItemName}>
                             <Text style={Comm.favorItemText}>{SUBWAY_NAME}</Text>
                        </View>
                        <TouchableOpacity style={Comm.favorItemDeleteBtn} onPress={(e) => deleteClick(SUBWAY_NAME)}>
                        <Text style={Comm.favorItemDeleteBtnText}>삭제</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
              </View>
        )
    }

    useEffect(() => {
       reload();
    },[]);

    const reload = useCallback(() =>{
        const param = {
            userid : id
        };
        setLoading(true);
        AxiosCall("GET", `${API_IP_INFO}/subway/subway-favor-list`, param, function ( data : any ) {
                            if ( data.length === 0 ) {
                                Alert.alert("즐겨찾기 리스트가 없습니다.");
                                setLoading(false);
                            } else {
                                setStationList(data);
                            }

                            setLoading(false);
        },() => { setLoading(false); });
    },[stationList]);

     if ( loading ) {
            return (
                <View style={Comm.loading}>
                    <ActivityIndicator size="large" />
                </View>
            );
    }

    return (
        <View style={Section.favorListInner}>
            { 
                stationList && <FlatList
                                    data={stationList}
                                    keyExtractor={(item, index) => item.LINE_NUM + index.toString()}
                                    renderItem={renderFavorItem}
                                    contentContainerStyle={Comm.favorListContainer}
                                    nestedScrollEnabled ={true}
                                    /> 
            } 
        </View>
    )
}

export default FavorSubway;