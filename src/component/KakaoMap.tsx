import { Text, View, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { WebView } from 'react-native-webview';
import * as Location  from 'expo-location';

 
  
const KakaoMap = ({ latitude, longitude } : any) => {
  const [test, setTest] = useState(null);
     const kakaoMapHtml = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Kakao Map</title>
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=b177a3c695762bf4dee23f352c19cbee&libraries=services"></script>
      <style>
        html, body, #map { margin: 0; padding: 0; width: 100%; height: 500px; }
        .map_move {position : absolute; z-index : 99999; width : 120px; height : 60px;  }
      </style>
    </head>
    <body>
       <button class='map_move' id="map_move">내위치</button> 
      <div id="map">
      
      </div>
      <script>
        kakao.maps.load(function() {
          const container = document.getElementById('map');
          const options = {
            center: new kakao.maps.LatLng(${latitude}, ${longitude}), // 지도의 중심좌표
            level: 3
          };
      
          // 마커
          let marker = null;
          
          // 맵
          let map = new kakao.maps.Map(container, options);
          
          // 마커 추가 (선택 사항)
          const markerPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
          marker = new kakao.maps.Marker({
                position: markerPosition
          });
      
          marker.setMap(map);
          const mapMoveBtn = document.getElementById("map_move");

          const getCurrentLocation = async () => {
                 const { granted } = await Location.requestForegroundPermissionsAsync();

                 if ( !granted ) {
                   return;
                 } else {
                   try {
                           const { coords } = await Location.getCurrentPositionAsync({accuracy: 5});
                       } catch (error) {
                           console.error('위치 정보를 가져오는 데 실패했습니다:', error)
                       }
                 }
            };

          mapMoveBtn.addEventListener('click', () => {
          alert(${test});
          setTest(true);
                  getCurrentLocation();
           });

          
            function test () {

            }
           
        });
      </script>
    </body>
    </html>
  `;
console.log(test);
    return (
      <View style={styles.container}>
        <WebView
            originWhitelist={['*']}
            source={{ html: kakaoMapHtml }}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            onLoad={() => console.log('WebView loaded successfully')}
            onError={(e) => console.error('WebView error: ', e.nativeEvent)}
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
