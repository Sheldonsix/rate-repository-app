// import { useQuery } from "@apollo/client";
import useMyReviews from "../hooks/useMyReviews";
import MyReviewsList from "./MyReviewsList";
import { View } from 'react-native';
import Text from './Text';

const MyReviews = () => {
    const { data, loading, fetchMore, refetch } = useMyReviews({
        includeReviews: true
    });

    if (loading) {
        return (
            <View><Text fontSize='bold'>loading……</Text></View>
        );
    }

    

    const reviewNodes = data.me ? data.me.reviews.edges.map(edge => edge.node) : []
    return (
        <MyReviewsList reviewNodes={reviewNodes} fetchMore={fetchMore} refetch={refetch}/>
    )
}

export default MyReviews