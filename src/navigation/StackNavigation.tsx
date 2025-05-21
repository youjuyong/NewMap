import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommonType } from "../type/common";
import Home from "../screens/Home";
import LocationSearch from '../screens/LocationSearch';
const StackNavigation = () => {
    
    const Stack = createNativeStackNavigator<CommonType.RootStackPageList>();

    const customStackNavigationOptions: any = {
	    gestureEnabled: false,
	    title: '',
	    headerStyle: {
	        backgroundColor: '#209bec',
	    },
	    headerTintColor: '#fff',
	    headerTitleStyle: {
	        fontWeight: 'bold',
	    }
	}

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"home"} screenOptions={customStackNavigationOptions}>
                  <Stack.Screen name="home" options={{ headerShown   : false}}>
                         {(props) => <Home {...props} />}
                  </Stack.Screen>
                  <Stack.Screen name="locationSearch">
                        {(props) => <LocationSearch {...props} />}
                  </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation;