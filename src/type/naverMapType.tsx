import { Component, JSX } from "react";
import { ImageSourcePropType, requireNativeComponent }  from "react-native";

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

export declare class Marker extends Component<MarkerProps> {
    render() : JSX.Element;
}

export {};