import React from 'react';
import { NativeSyntheticEvent, ViewProps, View, HostComponent} from 'react-native';
import { LatLng, LineCapType, LineJoinType, Point } from '../../type/naverMapType';
import { Polyline, Align } from 'react-native-nmap';
export type MapPolylineProps = ViewProps & {
    
    strokeColor : string;

    strokeColors : string[];

    strokeWidth : number;

    coordinates : LatLng[];

    fillColor ?: string;

    geodesic ?: boolean;

    lineCap ?: LineCapType;

    lineDashPattern ?: number[];

    lineDashPhase ?: number;

    lineJoin ?: LineJoinType;

    miterLimit ?: number;

    onPress ?: (event : PolylinePressEvent) => void;

    tappable ?: boolean;

    zIndex ?: number;

    align ?: Align | string | undefined;
}

type NativeProps = MapPolylineProps & { ref : any} & any;

export type MapPolyNativeComponentType = HostComponent<NativeProps> ;

export class MapPolyline extends React.Component<MapPolylineProps> {

    private polyline : NativeProps['ref'];
    
    constructor (props : MapPolylineProps) {
        super(props);
        this.polyline = React.createRef<MapPolyNativeComponentType | null | undefined | any>();
    }
    
    setNativeProps(props: NativeProps) {
        this.polyline.current?.setNativeProps(props);
    }
    
    render() {
        return(
        <Polyline
            {...this.props}
            strokeColor={this?.props.strokeColor ?? '#000'}
            strokeWidth={this?.props.strokeWidth ?? 1}
            ref={this.polyline}
        />
      )
  }

}

type PolylinePressEvent = NativeSyntheticEvent<{
    action : 'polyline-press';

    id ?: string;

    coordinate : LatLng;

    position ?: Point
}>