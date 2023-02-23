import { useQuery } from '@apollo/client';
import { GET_RESPOSITORY_BY_ID } from '../graphql/querise';

const useRepository = (variables) => {
    const { data, loading, fetchMore, ...result } = useQuery(GET_RESPOSITORY_BY_ID, {
        variables,
        fetchPolicy: 'cache-and-network'
    });
    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
        if (!canFetchMore) { return; }
        console.log('fetch more data……');
        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables
            }
        })
    };

    return {
        data,
        fetchMore: handleFetchMore,
        loading,
        ...result
    }
}

export default useRepository;