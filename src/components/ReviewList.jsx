import { FlatList, View, StyleSheet } from 'react-native';
// import { useQuery } from '@apollo/client';
// import Text from './Text';
import { Card } from 'react-native-paper';
// import { GET_REVIEWS_BY_ID } from '../graphql/querise';
import ReviewItem from './ReviewItem';
// import useReviews from '../hooks/useReviews';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = ({ reviewNodes, fetchMore }) => {
    // const {data, loading, error} = useQuery(GET_REVIEWS_BY_ID, {
    //     fetchPolicy: 'cache-and-network',
    //     variables:{
    //         repositoryId: id
    //     }
    // });
    // const { data, fetchMore } = useReviews({
    //     repositoryId: id,
    //     first: 4
    // })

    const onEndReach = () => {
        fetchMore();
    }

    // const reviewNodes = data?.repository ? data.repository.reviews.edges.map(edge => edge.node) : []

    return (
        <FlatList
            data={reviewNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <Card><ReviewItem item={item} /></Card>}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        ></FlatList>

    )
}

export default ReviewList;