import NaverMapView, { Marker }  from 'react-native-nmap';
import { mapInstanceType } from "../../type/naverMapType";
import { RouteInfoState } from "../../type/common";
import useRouteStore  from "../../common/utils/store/useRouteStore";
import { PropsWithChildren, ReactElement } from 'react';

/*
*
* 맵 그리기
*  
*/
export function MapInstance ({ width, height, showMyLocBtn, latitude, longitude, zoomLevel } : PropsWithChildren<mapInstanceType> ) : ReactElement | undefined{
    const { routeSubwayInfo } : RouteInfoState = useRouteStore(); 
    const { routeName } = routeSubwayInfo;

    if ( routeName === null ) 
    {
        return(  
            <NaverMapView  
                            style={{width: width, height: height}}
                            showsMyLocationButton={showMyLocBtn}
                            center={{latitude: latitude , longitude: longitude, zoom: zoomLevel}}
            >
                { MarkerImg ('myLocMarker') }
            </NaverMapView>
        )
    }
}

/*
*
* 마커 이미지 
*  
*/
export function MarkerImg ( type : string ) {
    const { routeSubwayInfo } : RouteInfoState = useRouteStore(); 
    const { latitude, longitude } = routeSubwayInfo;
    
    if ( type === 'myLocMarker' ) 
    {
        return (
                <Marker coordinate={{ latitude : latitude, longitude : longitude}} 
                             image={require("../../../public/images/location.png")}
                             width={40} 
                            height={40}></Marker>
        )
    }
}