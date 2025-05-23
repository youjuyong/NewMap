import { Text, View, StyleSheet, Alert, Pressable, TextInput, Keyboard, TouchableWithoutFeedback  } from "react-native";
import { Section } from "../../public/styles";
import { useCallback } from "react";

type props = {
    setIsFocus : ( e: boolean) => void
}
const SubWayInfo = ( props : props ) => {

    const onPress = useCallback(( bol : boolean ) => {
        props.setIsFocus(false);
        Keyboard.dismiss(); 
    },[]);

    return (
                 <Pressable style={{width : '100%', height: '100%'}} onPress={() => onPress(false)}>
                    <View style={Section.SubWayInfo}>
                        <View style={Section.SubWayInfoInner}></View>
                    </View>
                </Pressable>
    )
}

export default SubWayInfo;