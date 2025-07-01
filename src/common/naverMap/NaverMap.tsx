import { Text, View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { RouteInfoState } from "../../type/common";
import useRouteStore  from "../../common/utils/store/useRouteStore";
import { MapInstance } from "./Naver_Common";

function NaverMap () : React.JSX.Element  {
  const { routeSubwayInfo } : RouteInfoState = useRouteStore();
  
  return (
      <View style={styles.container}>
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
});

export default NaverMap;
