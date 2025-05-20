

import React from 'react';
import { Root_Css, Header_Container, Section } from "./public/styles";
import type {PropsWithChildren} from 'react';
import { ScrollView, StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity 
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <View style={[backgroundStyle, Root_Css.defaultSize]}>

      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={backgroundStyle}>
        <View style={Header_Container.divContainer}>
            <View style={Header_Container.divInnerContainer}>
                <Text style={Header_Container.textPTag}>𝙉𝙚𝙬𝙈𝙖𝙥</Text>
            </View>
        </View>
   
        <View
          style={[{
            backgroundColor: isDarkMode ? Colors.black : Colors.white
          }, Section.mainBoxDiv]}>
            <View style={Section.mainBoxInner}>
            <TouchableOpacity  style={Section.mainBoxButton} ><Text>위치찾기1</Text></TouchableOpacity >
            <TouchableOpacity  style={Section.mainBoxButton} ><Text>위치찾기2</Text></TouchableOpacity >
            <TouchableOpacity  style={Section.mainBoxButton} ><Text>위치찾기3</Text></TouchableOpacity >
            <TouchableOpacity  style={Section.mainBoxButton} ><Text>위치찾기4</Text></TouchableOpacity >
            </View>
        </View>
      </ScrollView>
    </View>
  );
}


export default App;
