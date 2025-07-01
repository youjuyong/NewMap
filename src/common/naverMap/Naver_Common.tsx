import NaverMapView, { Marker }  from 'react-native-nmap';
import { mapInstanceType } from "../../type/naverMapType";
import { RouteInfoState } from "../../type/common";
import useRouteStore  from "../../common/utils/store/useRouteStore";
import { PropsWithChildren, ReactElement } from 'react';
import {MapMarker} from "./MapMarker";

/*
*
* Map Instance
*  
*/
export function MapInstance ({ width, height, showMyLocBtn, cur_latitude, cur_longitude, zoomLevel } : PropsWithChildren<mapInstanceType> ) : ReactElement | undefined{
    const { routeSubwayInfo } : RouteInfoState = useRouteStore(); 
    const { routeName, latitude, longitude, type } = routeSubwayInfo;

    if ( routeName === null ) 
    {
        return(  
            <NaverMapView  
                            style={{width: width, height: height}}
                            showsMyLocationButton={showMyLocBtn}
                            center={{latitude: cur_latitude , longitude: cur_longitude, zoom: zoomLevel}}
            >
                <MapMarker coordinate={{ latitude : latitude, longitude : longitude}} type={ type }></MapMarker>
            </NaverMapView>
        )
    }
}
