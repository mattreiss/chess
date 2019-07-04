import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { DrawerNavigator } from './src/components/navigators';
import * as Redux from './src/data/redux/Redux';

export default class App extends React.Component {
  state = {
    key: "PersistenceKey-0"
  }

  constructor(props) {
    super(props);
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
      <Provider store={Redux.store}>
        <PersistGate loading={this.renderLoading()} persistor={Redux.persistor}>
          <DrawerNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
