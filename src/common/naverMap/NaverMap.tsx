import { Text, View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useEffect, useState, useRef } from "react";
import { RouteInfoState } from "../../type/common";
import useRouteStore  from "../../common/utils/store/useRouteStore";
import NaverMapView  from 'react-native-nmap';

function NaverMap () : React.JSX.Element  {
  const { routeSubwayInfo } : RouteInfoState= useRouteStore();
  const mapRef = useRef<NaverMapView>(null);


  return (
      <View style={styles.container}>
          <NaverMapView style={{width: '100%', height: '100%'}}
                         showsMyLocationButton={true}
                         center={{latitude: 37.564362, longitude: 126.977011, zoom: 16}}>
          </NaverMapView>
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
