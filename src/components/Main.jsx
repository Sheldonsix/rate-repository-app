// import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import { Route, Routes, Navigate } from 'react-router-native';
import Signin from './Signin';
import Signout from './Signout';
import RepositoryByID from './RepositoryByID';
import CreateReview from './ReviewForm';
import Signup from './Signup';
import MyReviews from './MyReviews';
// import { useParams } from 'react-router-dom';
// import {useQuery} from "@apollo/client";
// import { GET_RESPOSITORIES_BY_ID } from '../graphql/querise';
// import Text from './Text';

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        
    }
});

const Main = () => {
    // const {id} = useParams();
    // const {data, loading, error} = useQuery(GET_RESPOSITORIES_BY_ID, {
    //     variables: {
    //         repositoryId: id
    //     }
    // });
    // if(loading) {
    //     return <View><Text fontSize='bold'>loading……</Text></View>
    // }
    // if(error) {
    //     return <View><Text fontSize='bold'>{error.message}</Text></View>
    // }
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path='/' element={<RepositoryList />} exact />
                <Route path='*' element={<Navigate to="/" replace />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/signout' element={<Signout />} />
                <Route path='/:id' element={<RepositoryByID />} />
                <Route path='/createReview' element={<CreateReview />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/myReviews' element={<MyReviews />} />
            </Routes>
            
        </View>
    );
};

export default Main;