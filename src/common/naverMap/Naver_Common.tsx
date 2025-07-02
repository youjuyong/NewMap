import NaverMapView, { Marker }  from 'react-native-nmap';
import { View,Text } from "react-native";
import { mapInstanceType, getByMetroImgUrl, getByMetroImgSzie, getByTrainImgSize, getByTrainImgUrl } from "../../type/naverMapType";
import { RouteInfoState, RouteSubWayInfo, SubwayArrivalInfo } from "../../type/common";
import useRouteStore  from "../../common/utils/store/useRouteStore";
import { PropsWithChildren, ReactElement } from 'react';
import {MapMarker} from "./MapMarker";
import { Markers } from "./Marker_Object";

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
                    latitude : cur_latitude, 
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

    if ( routeName === null ) 
    {
        return(  
            <NaverMapView  
                            {...map_options}
            >
                <MapMarker {...marker_options}
                             imageSrc={getByMetroImgUrl('', Markers)}
                                width={ getByMetroImgSzie('', Markers).WIDTH } 
                               height={ getByMetroImgSzie('', Markers).HEIGHT }></MapMarker>
            </NaverMapView>
        )
    }
    
    if ( routeName !== null )
    {
        return(
             <NaverMapView  
                            {...map_options}
            >
                <MapMarker {...marker_options}
                                 imageSrc={ getByMetroImgUrl('', Markers) } 
                                    width={ getByMetroImgSzie('', Markers).WIDTH } 
                                   height={ getByMetroImgSzie('', Markers).HEIGHT } 
                                ></MapMarker>
                {
                    subWayInfoList.map((info : RouteSubWayInfo) => {

                        const { CHANGE_STAT_YN, subwayArrivalInfo } = info;

                        return (
                            <MapMarker coordinate={{ 
                                            latitude : Number(info.Y_CRDN), 
                                            longitude : Number(info.X_CRDN)
                                        }} 
                                        imageSrc={ getByMetroImgUrl(CHANGE_STAT_YN, Markers) }
                                           width={ getByMetroImgSzie(CHANGE_STAT_YN, Markers).WIDTH } 
                                          height={ getByMetroImgSzie(CHANGE_STAT_YN, Markers).HEIGHT } 
                            >
                            </MapMarker>
                        )
                    })
                }
                {
                    subWayInfoList.map((info : RouteSubWayInfo) => {

                        const { subwayArrivalInfo } = info;

                        if ( subwayArrivalInfo.length > 0 ) 
                        {
                              return (
                                subwayArrivalInfo.map( (trainInfo : SubwayArrivalInfo, index : number ) => {

                                const { updnLine } = trainInfo;
                            
                                    return (
                                        <MapMarker coordinate={{ 
                                                    latitude : Number(info.Y_CRDN), 
                                                    longitude : Number(info.X_CRDN)
                                                }} 
                                                key={ updnLine + index }
                                                imageSrc={ getByTrainImgUrl(updnLine, Markers) }
                                                width={ getByTrainImgSize(updnLine, Markers).WIDTH } 
                                            height={ getByTrainImgSize(updnLine, Markers).HEIGHT } 
                                        ></MapMarker>
                                    )
                                })
                            )
                        }
                    })
                    
                }
            </NaverMapView>
        )
    }
}
