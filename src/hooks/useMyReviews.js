import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/querise';

const useMyReviews = (variables) => {
    const { data, loading, fetchMore, refetch,...result } = useQuery(GET_CURRENT_USER, {
        variables,
        fetchPolicy: 'cache-and-network'
    });
    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;
        if (!canFetchMore) return;
        console.log('fetch more data……');
        fetchMore({
            variables: {
                after: data.me.reviews.pageInfo.endCursor,
                ...variables
            }
        })
    };

    return {
        data,
        fetchMore: handleFetchMore,
        loading,
        refetch,
        ...result
    }
}

export default useMyReviews;