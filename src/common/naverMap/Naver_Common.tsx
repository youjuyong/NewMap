import NaverMapView, { Align, Polyline }  from 'react-native-nmap';
import { useRef } from 'react';
import { mapInstanceType, getByMetroImgUrl, getByMetroImgSzie, getByTrainImgSize, getByTrainImgUrl, LatLng, getByPolyLineColor } from "../../type/naverMapType";
import { RouteInfoState, RouteSubWayInfo, SubwayArrivalInfo } from "../../type/common";
import useRouteStore  from "../../common/utils/store/useRouteStore";
import { PropsWithChildren, ReactElement } from 'react';
import { MapMarker } from "./MapMarker";
import { Markers, routeColorSeriz } from "./Marker_Object";
import { color } from "../../../public/var";

let mapRef:any = null;
/*
*
* Map Instance
*  
*/
export function MapInstance ({ width, height, showMyLocBtn, cur_latitude, cur_longitude, zoomLevel } : PropsWithChildren<mapInstanceType> ) : ReactElement | undefined {
    const { routeSubwayInfo } : RouteInfoState = useRouteStore(); 
    const { routeName, 
             latitude, 
             longitude, 
             subWayInfoList 
          } = routeSubwayInfo;

    const marker_options = {
            coordinate: { 
                latitude : latitude, 
                longitude : longitude
            },
    }
    
    
    let polyLine:LatLng[] = [];
    let subwayId:string | undefined | null= null;
   
    // 호선 선택 x
    if ( routeName === null ) 
    {
        return(  
            <NaverMapView  
                            style = {{
                                width: width,
                                height: height
                            }}
            showsMyLocationButton = {showMyLocBtn}
            center = {{
                    latitude  : cur_latitude, 
                    longitude : cur_longitude, 
                    zoom      : zoomLevel
            }}
            >
                <MapMarker {...marker_options}
                             imageSrc={getByMetroImgUrl('', Markers)}
                                width={ getByMetroImgSzie('', Markers).WIDTH } 
                               height={ getByMetroImgSzie('', Markers).HEIGHT }
                               caption={{ text : '현재 위치', haloColor : color.purple100 }}
                ></MapMarker>
            </NaverMapView>
        )
    }
    // 호선 선택 O
    if ( routeName !== null )
    {
         const { southWest, northEast } = getBounds( subWayInfoList.map((info : RouteSubWayInfo) => { 
                                                                        return { 
                                                                            latitude : Number(info.Y_CRDN),
                                                                            longitude : Number(info.X_CRDN) 
                                                                        }
                                                                    }) 
                                                                );
        return(
             <NaverMapView  
                style = {{
                    width: width,
                    height: height
                }}
                showsMyLocationButton = {showMyLocBtn}
                center={{
                        latitude: ( southWest.latitude + northEast.latitude ) / 2,
                        longitude: ( southWest.longitude + northEast.longitude ) / 2,
                        zoom: 9,
                }}
                >
                <MapMarker {...marker_options}
                                 imageSrc={ getByMetroImgUrl('', Markers) } 
                                    width={ getByMetroImgSzie('', Markers).WIDTH } 
                                   height={ getByMetroImgSzie('', Markers).HEIGHT } 
                                   caption={{ text : '현재 위치', haloColor : color.purple100 }}
                                ></MapMarker>
                {
                    subWayInfoList.map((info : RouteSubWayInfo, index : number) => {
                      
                        const { CHANGE_STAT_YN, STATION_NM, X_CRDN, Y_CRDN, SUBWAY_ID, STATION_CD } = info;

                        polyLine.push({ latitude : Number(Y_CRDN), longitude : Number(X_CRDN) });
                        subwayId = SUBWAY_ID;

                        return (
                            <MapMarker coordinate={{ 
                                            latitude : Number(info.Y_CRDN), 
                                            longitude : Number(info.X_CRDN)
                                        }} 
                                        key = {STATION_NM}
                                        imageSrc={ getByMetroImgUrl(CHANGE_STAT_YN, Markers) }
                                           width={ getByMetroImgSzie(CHANGE_STAT_YN, Markers).WIDTH } 
                                          height={ getByMetroImgSzie(CHANGE_STAT_YN, Markers).HEIGHT } 
                                         caption={{ text : STATION_NM, haloColor : color.blue300 }}
                            >
                            </MapMarker>
                        )
                    })
                }
                {
                    subWayInfoList.filter((v : RouteSubWayInfo ) => v.subwayArrivalInfo?.length > 0 && v.subwayArrivalInfo?.length !== undefined)
                                  .map((info : RouteSubWayInfo ) => {

                        const { subwayArrivalInfo } = info;

                              return (
                                subwayArrivalInfo.map( (trainInfo : SubwayArrivalInfo, index : number ) => {

                                const { updnLine, trainSttus, statnTnm, statnId } = trainInfo;
                                
                                    return (
                                        <>
                                        <MapMarker coordinate={{ 
                                                    latitude : Number(info.Y_CRDN), 
                                                    longitude : Number(info.X_CRDN)
                                                }} 
                                                key = {String(statnId) + String(trainSttus)}
                                                imageSrc={ getByTrainImgUrl(updnLine, Markers) }
                                                width={ getByTrainImgSize(updnLine, Markers).WIDTH } 
                                            height={ getByTrainImgSize(updnLine, Markers).HEIGHT } 
                                            caption={{ text : trainSttus, align : Align.Top, haloColor : color.yellow400 }}
                                        ></MapMarker>
                                        </>
                                    )
                                })
                            )
                    })
                }
               <Polyline coordinates={[...polyLine]} strokeColor={getByPolyLineColor(Number(subwayId || 9999), routeColorSeriz)} strokeWidth={3}></Polyline>
            </NaverMapView>
        )
    }
}

function getBounds ( markers : any ) : any {
  if (markers?.length === 0 || markers?.length === undefined ) return null;

  let minLat = markers[0].latitude;
  let maxLat = markers[0].latitude;
  let minLng = markers[0].longitude;
  let maxLng = markers[0].longitude;

  for ( let i = 1; i < markers.length - 1; i++ ) {
    const { latitude, longitude } = markers[i];
    if (latitude < minLat) minLat = latitude;
    if (latitude > maxLat) maxLat = latitude;
    if (longitude < minLng) minLng = longitude;
    if (longitude > maxLng) maxLng = longitude;
  }

  return {
    southWest: { latitude: minLat, longitude: minLng },
    northEast: { latitude: maxLat, longitude: maxLng },
  };
} 