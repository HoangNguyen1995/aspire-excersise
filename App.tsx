import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navigators/RootNavigation';
import {Provider} from 'react-redux';
import {reduxStore} from './redux/stores';

function App(): React.JSX.Element {
  return (
    <Provider store={reduxStore}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
