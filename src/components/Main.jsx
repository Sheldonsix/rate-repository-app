// import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import { Route, Routes, Navigate } from 'react-router-native';
import Signin from './Signin';
import Signout from './Signout';

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    }
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            
            <Routes>
                <Route path='/' element={<RepositoryList />} exact />
                <Route path='*' element={<Navigate to="/" replace />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/signout' element={<Signout />} />
            </Routes>
            
        </View>
    );
};

export default Main;