import RepositoryItem from "./RepositoryItem";
import { useParams } from 'react-router-dom';
// import { useQuery } from "@apollo/client";
// import { GET_RESPOSITORY_BY_ID } from '../graphql/querise';
import Text from './Text';
import { Button, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import * as Linking from "expo-linking"
import ReviewList from "./ReviewList";
import useRepository from "../hooks/useRepository";

const styles = StyleSheet.create({
    view: {
        height: '90%'
    }
})

const RepositoryByID = () => {
    const { id } = useParams();
    const { data, fetchMore, loading } = useRepository({
        repositoryId: id
    })
    // const { data, loading, error } = useQuery(GET_RESPOSITORY_BY_ID, {
    //     variables: {
    //         repositoryId: id
    //     }
    // });
    if (loading) {
        return (
            <View><Text>loading……</Text></View>
        )
    }

    const reviewNodes = data?.repository ? data.repository.reviews.edges.map(edge => edge.node) : []
    return (
        <View style={styles.view}>
            <Card>
                <RepositoryItem item={data?.repository} />
                <Button onPress={() => Linking.openURL(data?.repository.url)} title="Open in GitHub" />
            </Card>
            <ReviewList reviewNodes={reviewNodes} fetchMore={fetchMore} />
        </View>
    )
};

export default RepositoryByID;