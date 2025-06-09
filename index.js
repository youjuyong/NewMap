/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store  from './src/common/utils/reducer';
import { Provider }  from 'react-redux';

const Apps = () => {
    
    return (
         <Provider store={store}>
                <App/>
        </Provider>
    )
}
AppRegistry.registerComponent(appName, () => Apps);
