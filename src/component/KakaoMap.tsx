import { Text, View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useEffect, useState, useRef } from "react";
import { WebView } from 'react-native-webview';
import * as Location  from 'expo-location';
import { resolver } from "../../metro.config";
import { locationType } from "../type/common";
import { RouteInfoState } from "../type/common";
import useRouteStore  from "../common/utils/store/useRouteStore";

const KakaoMap = () => {
  const { routeSubwayInfo } : RouteInfoState= useRouteStore();
  const webViewRef = useRef<any>(null);

  const handleMessage = (event : any) => {
    console.log("handleMessage", event.nativeEvent.data);
  };
  
  return (
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
            originWhitelist={['*']}
            source={require("../common/kakaoMap/map.html")}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            onMessage={handleMessage}
            onLoad={() => console.log('WebView loaded successfully')}
            onError={(e) => console.error('WebView error: ', e.nativeEvent)}
            onLoadEnd={() => {
              webViewRef.current && webViewRef.current.postMessage(JSON.stringify(routeSubwayInfo));
            }}
             injectedJavaScript={`(function() {
              window.console.log = function(message) {
                window.ReactNativeWebView.postMessage(message);
              }
            })();`}
        />
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

export default KakaoMap;
