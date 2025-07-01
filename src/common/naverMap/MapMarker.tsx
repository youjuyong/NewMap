import * as React from 'react';
import {
    ViewProps,
    ImageURISource,
    ImageRequireSource,
} from 'react-native';
import {
    Point,
    LatLng
} from '../../type/naverMapType';
import {
    Modify
} from "../../type/sharedTypesOption";
import {
    Commands,
    MapMarkerNativeComponentType
} from "./MapMarkerNativeComponent";
import { Marker } from 'react-native-nmap';

export type MapMarkerPros = ViewProps & {
    
    coordinate : LatLng;

    anchor ?: Point;

    calloutAnchor ?: Point;

    image ?: ImageURISource | ImageRequireSource;

    draggable ?: boolean;

    description ?: string;

    icon ?: ImageURISource | ImageRequireSource;

    zIndex ?: number;

    stopPropagation ?: boolean;

    type ?: string;
}

export type OmittedProps = Omit<MapMarkerPros, 'stopPropagation'>;

export type NativeProps = Modify<
        OmittedProps, 
        { icon ?: string, image ?: MapMarkerPros['image'] | string } 
    > & {
        ref : React.RefObject<Marker> 
};

export class MapMarker extends React.Component<MapMarkerPros> {
    
    private marker : NativeProps['ref'] ;

    constructor ( props : MapMarkerPros ) {
       super(props);
        
       this.marker = React.createRef<MapMarkerNativeComponentType | null | undefined | any>();
       this.showCallout = this.showCallout.bind(this)
       this.hideCallout = this.showCallout.bind(this)
       this.redraw = this.showCallout.bind(this)
    }

    showCallout() {

        if ( this!.marker!.current ) {
            Commands.showCallout(this.marker.current);
        }
    }

    hideCallout() {
        if (this!.marker?.current) {
            Commands.hideCallout(this.marker.current);
        }
    }

    redraw() {
        if (this.marker.current) {
            Commands.redraw(this.marker.current);
        }
    }

    render () {
        const { stopPropagation = false } = this.props;
        
        let image;
        
        if ( this.props.type === 'myLocMarker' ) {
            image = require("../../../public/images/location.png");
        }

        return (
            <Marker
                {...this.props}
                ref={this.marker}
                coordinate={this.props.coordinate}    
                image={image} 
            >
            </Marker>
        )
    }

}