import Main from './src/components/Main';
import Constants from 'expo-constants';
import { View, StyleSheet } from 'react-native';
import { NativeRouter } from 'react-router-native';

const App = () => {
  return (
    <NativeRouter>
    <View style={styles.container}>
        <Main />
    </View>
    </NativeRouter>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

export default App;