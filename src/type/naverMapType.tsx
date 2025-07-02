import { Component, JSX } from "react";
import { ImageSourcePropType, requireNativeComponent }  from "react-native";
import { RouteSubWayInfo } from "./common";

export type LatLng = {
    latitude : number;
    longitude : number;
}

export type Point = {
    x : number;
    y : number;
}

interface Coord {
    latitude : number;
    longitude : number;
}

export interface SIZE {
    WIDTH : number,
    HEIGHT : number
}
export interface mapInstanceType {
    width : string,
    height : string
    cur_latitude : number, 
    cur_longitude : number,
    zoomLevel : number,
    showMyLocBtn ?: boolean,
    Marker ?: Marker,
}
interface MapOverlay {
    coordinate : Coord;
    onClick ?: () => void;
}

interface MarkerProps extends MapOverlay {
    anchor?: {
        x: number;
        y: number;
    };
    pinColor?: string;
    rotation?: number;
    flat?: boolean;
    image?: ImageSourcePropType;
    width?: number;
    height?: number;
    alpha?: number;
    animated?: boolean;
    caption?: {
        text?: string;
        align?: any;
        textSize?: number;
        color?: string;
        haloColor?: string;
    };
    subCaption?: {
        text?: string;
        textSize?: number;
        color?: number;
        haloColor?: number;
    };
}

interface Region extends Coord {
    latitudeDelta : number;
    longitudeDelta: number;
}

interface MarkerOption {
    normalStatMarker : {
        SIZE : {
            WIDTH : number,
            HEIGHT : number
        },
        SRC : ImageSourcePropType | undefined 
    },
     changeMarker : {
        SIZE : {
                  WIDTH  : number,
                  HEIGHT : number
        },
        SRC : ImageSourcePropType | undefined 
    },
    stationNameMarker : {
        SIZE: {
            WIDTH: number,
            HEIGHT: number
        },
        ANCHOR: {X: number, Y: number},
    },
    currentMarker : {
        SIZE: {
            WIDTH: number,
            HEIGHT: number
        },
        SRC:  ImageSourcePropType | undefined 
    },
    uplineMarker : {
        SIZE: {
            WIDTH: number,
            HEIGHT: number
        },
        SRC:  ImageSourcePropType | undefined 
    },
    downlineMarker : {
        SIZE: {
            WIDTH: number,
            HEIGHT: number
        },
        SRC:  ImageSourcePropType | undefined 
    }
}

export declare class Marker extends Component<MarkerProps> {
    render() : JSX.Element;
}

export type Statation_Stat =  Pick<RouteSubWayInfo, 'CHANGE_STAT_YN'>;

/*
*
* 지하철 역 마커 이미지 url
* 
*/
export function getByMetroImgUrl<T extends { CHANGE_STAT_YN : string | undefined }>( 
                CHANGE_STAT_YN : string | undefined,
                  markerObject : MarkerOption ) : ImageSourcePropType | undefined | number {

    if      ( CHANGE_STAT_YN === 'N' ) 
    {
        return markerObject.normalStatMarker.SRC;
    } 
    else if ( CHANGE_STAT_YN === 'Y' ) 
    {
        return markerObject.changeMarker.SRC;
    } 

    return markerObject.currentMarker.SRC;
}


/*
*
* 지하철 역 마커 이미지 size
* 
*/
export function getByMetroImgSzie<T extends { CHANGE_STAT_YN : string | undefined }>( 
        CHANGE_STAT_YN : string | undefined,
          markerObject : MarkerOption ) : SIZE {

    if      ( CHANGE_STAT_YN === 'N' ) 
    {
        return markerObject.normalStatMarker.SIZE;
    } 
    else if ( CHANGE_STAT_YN === 'Y' ) 
    {
        return markerObject.changeMarker.SIZE;
    } 

    return markerObject.currentMarker.SIZE;
}

/*
*
* 지하철 열차 마커 이미지 url
* 
*/
export function getByTrainImgUrl<T extends {  updnLine : string | undefined }>( 
                updnLine : string | undefined,
                  markerObject : MarkerOption ) : ImageSourcePropType | undefined  {

    if      ( updnLine === '상행/내선' ) 
    {
        return markerObject.uplineMarker.SRC;
    } 
    else if ( updnLine === '하행/외선' ) 
    {
        return markerObject.downlineMarker.SRC;
    } 

    return markerObject.downlineMarker.SRC;
}

/*
*
* 지하철 열차 마커 사이즈
* 
*/
export function getByTrainImgSize<T extends {  updnLine : string | undefined }>( 
                updnLine : string | undefined,
                  markerObject : MarkerOption ) : SIZE {

    if      ( updnLine === '상행/내선' ) 
    {
        return markerObject.uplineMarker.SIZE;
    } 
    else if ( updnLine === '하행/외선' ) 
    {
        return markerObject.downlineMarker.SIZE;
    } 

    return markerObject.downlineMarker.SIZE;
}

export {};