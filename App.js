import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider, connect } from 'react-redux'; // Import Provider and connect from react-redux
import store from './redux/store'; // Import your Redux store
import AuthScreen from './components/AuthScreen';
import LaunchesList from './components/LaunchesList';

const App = ({ isAuthenticated }) => {
  return (
    <SafeAreaView style={styles.container}>
      {isAuthenticated ? <LaunchesList /> : <AuthScreen />}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated // Assuming your authentication state is stored in authentication reducer
});

const ConnectedApp = connect(mapStateToProps)(App); // Connect App component to Redux store

export default function MainApp() {
  return (
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
