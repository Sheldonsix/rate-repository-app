// import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_RESPOSITORIES } from '../graphql/querise';


// const useRepositories = () => {
//     const [repositories, setRepositories] = useState();
//     const [loading, setLoading] = useState(false);

//     const fetchRepositories = async () => {
//         setLoading(true);
//         const response = await fetch('http://192.168.31.210:5000/api/repositories');
//         const json = await response.json();

//         setLoading(false);

//         setRepositories(json);
//     };

//     useEffect(() => {
//         fetchRepositories()
//     }, []);

//     return {
//         repositories,
//         loading,
//         refetch: fetchRepositories
//     };
// };

const useRepositories = (variables) => {
    const { data, loading, fetchMore, ...result } = useQuery(GET_RESPOSITORIES, {
        variables,
        fetchPolicy: 'cache-and-network',
    });
    // console.log(data.repositories.edges.map(edge => edge.node.fullName));
    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
        if (!canFetchMore) {
            return;
        }
        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables
            }
        })
    };

    return {
        data,
        fetchMore: handleFetchMore,
        loading,
        ...result
    };
}

export default useRepositories;