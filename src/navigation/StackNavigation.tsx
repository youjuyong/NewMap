import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommonType } from "../type/common";
import Home from "../screens/Home";
import Login from "../screens/Login";
import MyInfo from "../screens/MyInfo";
import LocationSearch from '../screens/LocationSearch';
import ArrivalStationSearch from '../screens/ArrivalStationSearch';
import TimeTable from '../screens/TimeTable';
import FavorSubway from "../screens/FavorSubway";
import FavorSubwayArrivalInfo from "../screens/FavorSubwayArrivalInfo";

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
                  <Stack.Screen name="locationSearch" options={{ headerTitle: '현재 위치찾기' }} >
                        {(props) => <LocationSearch {...props} />}
                  </Stack.Screen>
                  <Stack.Screen name="arrivalStationSearch" options={{ headerTitle: '도착정보 조회' }}>
                        {(props) => <ArrivalStationSearch {...props} />}
                  </Stack.Screen>
                  <Stack.Screen name="timeTable" options={{ headerTitle: '시간표' }}>
                        {(props) => <TimeTable {...props} />}
                  </Stack.Screen>
                  <Stack.Screen name="login" options={{ headerTitle: '로그인' }}>
                        {(props) => <Login {...props} />}
                  </Stack.Screen>
                  <Stack.Screen name="myInfo" options={{ headerTitle: '내정보' }}>
                        {(props) => <MyInfo {...props} />}
                  </Stack.Screen>
                  <Stack.Screen name="favorSubway" options={{ headerTitle: '즐겨찾기' }}>
                        {(props) => <FavorSubway {...props} />}
                  </Stack.Screen>
                  <Stack.Screen name="favorSubwayArriveInfo" options={{ headerTitle: '도착정보' }}>
                        {(props) => <FavorSubwayArrivalInfo {...props} />}
                  </Stack.Screen>
                  
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation;