import type { HostComponent } from "react-native";
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import { NativeProps } from "./MapMarker";
import { Marker } from 'react-native-nmap';
export type MapMarkerNativeComponentType = HostComponent<NativeProps> ;

interface NativeCommands {
    showCallout : (
        viewRef : NonNullable<
            React.RefObject<MapMarkerNativeComponentType | Marker>['current']
        >,
    ) => void;
    hideCallout : (
        viewRef : NonNullable<
            React.RefObject<MapMarkerNativeComponentType | Marker>['current']
        >,
    ) => void;
    redraw : (
        viewRef : NonNullable<
            React.RefObject<MapMarkerNativeComponentType | Marker>['current']
        >,
    ) => void;
}

export const Commands : NativeCommands = codegenNativeCommands<NativeCommands>({
    supportedCommands : [
        'showCallout',
        'hideCallout',
        'redraw'
    ]
});