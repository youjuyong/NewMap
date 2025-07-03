import NaverMapView, { Align, Marker, Polyline }  from 'react-native-nmap';
import { mapInstanceType, getByMetroImgUrl, getByMetroImgSzie, getByTrainImgSize, getByTrainImgUrl, LatLng, getByPolyLineColor } from "../../type/naverMapType";
import { RouteInfoState, RouteSubWayInfo, SubwayArrivalInfo } from "../../type/common";
import useRouteStore  from "../../common/utils/store/useRouteStore";
import { PropsWithChildren, ReactElement } from 'react';
import { MapMarker } from "./MapMarker";
import { Markers, routeColorSeriz } from "./Marker_Object";
import { color } from "../../../public/var";

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
             type, 
             subWayInfoList 
          } = routeSubwayInfo;

    const map_options = {
            style : {
                width: width,
                height: height
            },
            showsMyLocationButton : showMyLocBtn,
            center : {
                    latitude  : cur_latitude, 
                    longitude : cur_longitude, 
                    zoom      : zoomLevel
            }
    }      

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
                            {...map_options}
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
        return(
             <NaverMapView {...map_options}>
                <MapMarker {...marker_options}
                                 imageSrc={ getByMetroImgUrl('', Markers) } 
                                    width={ getByMetroImgSzie('', Markers).WIDTH } 
                                   height={ getByMetroImgSzie('', Markers).HEIGHT } 
                                   caption={{ text : '현재 위치', haloColor : color.purple100 }}
                                ></MapMarker>
                {
                    subWayInfoList.map((info : RouteSubWayInfo, index : string) => {
                      
                        const { CHANGE_STAT_YN, STATION_NM, X_CRDN, Y_CRDN, SUBWAY_ID, STATION_CD } = info;

                        polyLine.push({ latitude : Number(Y_CRDN), longitude : Number(X_CRDN) });
                        subwayId = SUBWAY_ID;

                        return (
                            <MapMarker coordinate={{ 
                                            latitude : Number(info.Y_CRDN), 
                                            longitude : Number(info.X_CRDN)
                                        }} 
                                        key={ String(STATION_CD) + index }
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
                    subWayInfoList.map((info : RouteSubWayInfo) => {

                        const { subwayArrivalInfo } = info;

                        if ( subwayArrivalInfo?.length > 0 && subwayArrivalInfo?.length !== undefined ) 
                        {
                              return (
                                subwayArrivalInfo.map( (trainInfo : SubwayArrivalInfo, index : number ) => {

                                const { updnLine, trainSttus } = trainInfo;
                                    return (
                                        <MapMarker coordinate={{ 
                                                    latitude : Number(info.Y_CRDN), 
                                                    longitude : Number(info.X_CRDN)
                                                }} 
                                                key={ String(index) + updnLine }
                                                imageSrc={ getByTrainImgUrl(updnLine, Markers) }
                                                width={ getByTrainImgSize(updnLine, Markers).WIDTH } 
                                            height={ getByTrainImgSize(updnLine, Markers).HEIGHT } 
                                            caption={{ text : trainSttus, align : Align.Top, haloColor : color.yellow400 }}
                                        ></MapMarker>
                                    )
                                })
                            )
                        }
                    })
                }
               <Polyline coordinates={[...polyLine]} strokeColor={getByPolyLineColor(Number(subwayId || 9999), routeColorSeriz)} strokeWidth={3}></Polyline>
            </NaverMapView>
        )
    }
}
