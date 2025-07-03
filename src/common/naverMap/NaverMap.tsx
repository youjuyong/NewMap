import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { RouteInfoState } from "../../type/common";
import useRouteStore  from "../../common/utils/store/useRouteStore";
import { MapInstance } from "./Naver_Common";

function NaverMap () : React.JSX.Element  {
  const { routeSubwayInfo } : RouteInfoState = useRouteStore();
  
  return (
      <View style={styles.container}>
        <View style={styles.naverDirImgContent}>
            <View style={styles.naverDirInner}>
                <View style={styles.naverDirInConrtIn}><Image style={styles.mainBoxLocImg} source={require("../../../public/images/marker_bus_blue.png")}></Image><Text style={styles.naverDirInnerText}>상행</Text></View>
                 <View style={styles.naverDirInConrtIn}><Image style={styles.mainBoxLocImg} source={require("../../../public/images/marker_bus_red.png")}></Image><Text style={styles.naverDirInnerText}>하행</Text></View>
            </View>
        </View>
        <MapInstance width ={'100%'} 
                  height = {'100%'}
                  showMyLocBtn = {true}
                  cur_latitude =  {routeSubwayInfo?.latitude}
                  cur_longitude = {routeSubwayInfo?.longitude}
                  zoomLevel = {16}>
        </MapInstance>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height : 100,
    position : 'relative'
  },
  naverDirImgContent : {
    position : 'absolute',
    top : 0,
    left : 0,
    height : 44,
    right : 0,
    zIndex : 2,
    backgroundColor : '#171717',
    opacity : 0.7
  }, 
  naverDirInner : {
    flexDirection : 'row',
    flexWrap : 'wrap'
  },
  mainBoxLocImg : {
    marginTop : 0,
    marginRight : 2
  },
  naverDirInnerText : {
    color : 'white',
    fontSize : 14,
    fontWeight : 700,
    marginRight : 5,
    marginTop : 5,
      opacity : 1
  },
  naverDirInConrtIn : {
    flexDirection : 'row',
    flexWrap : 'wrap',
    marginTop : 5,
  }
});

export default NaverMap;
