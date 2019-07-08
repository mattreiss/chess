import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { useScreens } from 'react-native-screens';
import { AuthNavigator } from './src/components/navigators';
import { store, persistor } from './src/data/redux/Redux';

export default class App extends React.Component {
  state = {
    key: "PersistenceKey-0"
  }

  constructor(props) {
    super(props);
    useScreens();
  }

  componentDidCatch(error,errorInfo) {
    this.setState({
      key: this.state.key + ".0"
    })
  }

  renderLoading() {
    return (
      <Text>Loading...</Text>
    )
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={this.renderLoading()} persistor={persistor}>
          <AuthNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
