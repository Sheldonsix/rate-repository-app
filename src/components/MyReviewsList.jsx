import { FlatList, View, StyleSheet } from 'react-native';
// import { useQuery } from '@apollo/client';
// import Text from './Text';
import { Card } from 'react-native-paper';
// import { GET_REVIEWS_BY_ID } from '../graphql/querise';
import ReviewItem from './ReviewItem';
// import useReviews from '../hooks/useReviews';
import { Button } from 'react-native-paper';
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DELETE_REVIEW } from '../graphql/mutation';
import { Alert } from 'react-native';



const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewsList = ({ reviewNodes, fetchMore, refetch }) => {
    const [mutate] = useMutation(DELETE_REVIEW);
    const navigate = useNavigate();

    const toRepository = (repositoryId) => {
        navigate(`/${repositoryId}`)
    }
    const deleteReview = (reivewId) => {
        Alert.alert('Delete review', 'Are you sure you want to delete this review',
            [
                {
                    text: 'CANCEL',
                    style: 'cancel',
                    onPress: () => console.log('Cancel Pressed')
                },
                {
                    text: 'DELETE',
                    onPress: async () => {
                        try {
                            await mutate({
                                variables: {
                                    deleteReviewId: reivewId
                                }
                            });
                            refetch();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            ]
        );
        // try{
        //     await mutate({
        //         variables: {
        //             deleteReviewId: reivewId
        //         }
        //     });
        // } catch(error) {
        //     console.log(error);
        // }
    }

    const onEndReach = () => {
        fetchMore();
    }

    return (
        <FlatList
            data={reviewNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => {
                return (
                    <Card>
                        <ReviewItem item={item} />
                        <View style={styles.button}>
                            <Button buttonColor='#0366d6' mode="contained" onPress={() => toRepository(item.repositoryId)}>View repository</Button>
                            <Button buttonColor='#d6394c' mode="contained" onPress={() => deleteReview(item.id)}>Delete review</Button>
                        </View>
                    </Card>)
            }
            }
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        ></FlatList>

    )
}

export default MyReviewsList;