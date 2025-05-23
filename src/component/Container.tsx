import { Text, View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Container } from "../../public/styles";
import type { FC, PropsWithChildren } from 'react';

export const BtnContainer : FC<PropsWithChildren> = ({ children }) => {

    return (
        <View style={Container.btnContainer}>{children}</View>
    );
} 