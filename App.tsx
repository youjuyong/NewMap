

import React from 'react';
import { Root_Css } from "./public/styles";
import StackNavigation from "./src/navigation/StackNavigation";
import { ScrollView, StatusBar, Image, Text, useColorScheme,
  View,
  TouchableOpacity ,
  Alert
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';


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
        <StackNavigation></StackNavigation>
    </View>
  );
}


export default App;
