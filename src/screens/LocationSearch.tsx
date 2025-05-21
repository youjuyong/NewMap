import { Text, View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webView';

  const kakaoMapHtml = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Kakao Map</title>
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=JS_APP_KEY"></script>
      <style>
        html, body, #map { margin: 0; padding: 0; width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        kakao.maps.load(function() {
          var container = document.getElementById('map');
          var options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3
          };
          var map = new kakao.maps.Map(container, options);
        });
      </script>
    </body>
    </html>
  `;
  
const LocationSearch = ({ route, navigation } : any) => {
    return (
      <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: kakaoMapHtml }}
        style={{ flex: 1 }}
      />
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LocationSearch;
