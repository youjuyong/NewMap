import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommonType } from "../type/common";
import Home from "../screens/Home";
import LocationSearch from '../screens/LocationSearch';
import ArrivalStationSearch from '../screens/ArrivalStationSearch';
import TimeTable from '../screens/TimeTable';

const StackNavigation = () => {
    
    const Stack = createNativeStackNavigator<CommonType.RootStackPageList>();

    const customStackNavigationOptions: any = {
	    gestureEnabled: false,
	    title: '',
	    headerStyle: {
	        backgroundColor: '#20c0ec',
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
                  <Stack.Screen name="arrivalStationSearch">
                        {(props) => <ArrivalStationSearch {...props} />}
                  </Stack.Screen>
                  <Stack.Screen name="timeTable">
                        {(props) => <TimeTable {...props} />}
                  </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation;