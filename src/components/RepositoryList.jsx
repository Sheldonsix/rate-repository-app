import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
// import { Card, Button,} from 'react-native-paper';
import { Card } from 'react-native-paper';
// import useRepositories from '../hooks/useRepositories';
// import { useQuery } from '@apollo/client';
// import { GET_REPOSITORIES_BY_KEYWORD, GET_REPOSITORIES_BY_ORDER } from '../graphql/querise';
// import Text from './Text';
import { useNavigate } from "react-router-dom";
import { Component, useState } from 'react';
// import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import useRepositories from '../hooks/useRepositories';


const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    view: {
        height: '90%'
    }
});

const ItemSeparator = () => <View style={styles.separator} />;


export const ListHeaderComponent = ({ selectedValue, setSelectedValue }) => {
    // const [selectedValue, setSelectedValue] = useState('latest');
    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            prompt='Select an item...'
        >
            <Picker.Item label='Latest repositories' value='latest' />
            <Picker.Item label='Highest rated repositories' value='highest' />
            <Picker.Item label='Lowest rated respositories' value='lowest' />
        </Picker>
    )
};

export const SearchBarComponent = ({ searchValue, setSearchQuery }) => {
    const onChangeSearch = query => setSearchQuery(query);
    return (
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchValue}
        />
    );
};


// export const RepositoryListContainer = ({ data }) => {
//     const repositoryNodes = data.repositories ? data.repositories.edges.map(edge => edge.node) : []
//     const navigate = useNavigate();
//     return (
//         <View>
//             <FlatList
//                 ListHeaderComponent={ListHeaderComponent}
//                 data={repositoryNodes}
//                 ItemSeparatorComponent={ItemSeparator}
//                 renderItem={({ item }) => <Card><Pressable onPress={() => navigate(`/${item.id}`)}><RepositoryItem item={item} /></Pressable></Card>}
//             />
//         </View>
//     );
// }

const RepositoryList = () => {
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState('latest');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchValue] = useDebounce(searchQuery, 500);
    const { data, fetchMore } = useRepositories({
        first: 4,
        searchKeyword: searchValue,
        orderBy: selectedValue === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
        orderDirection: selectedValue === 'latest' ? 'DESC' : selectedValue === 'highest' ? 'DESC' : 'ASC'
    })
    // if (searchValue !== '') {
    //     console.log('searchValue', searchValue);
    //     ({ data } = useQuery(GET_REPOSITORIES_BY_KEYWORD, {
    //         fetchPolicy: 'cache-and-network',
    //         variables: {
    //             searchKeyword: searchValue
    //         }
    //     }))
    //     console.log(data.repositories.edges.map(edge => edge.node.fullName));
    // } else if (selectedValue === 'latest') {
    //     ({ data, fetchMore } = useRepositories({
    //         first: 4
    //     }))
    //     // ({ data, loading } = useQuery(GET_RESPOSITORIES, {
    //     //     fetchPolicy: 'cache-and-network'
    //     // }))
    // } else if (selectedValue === 'highest') {
    //     ({ data } = useQuery(GET_REPOSITORIES_BY_ORDER, {
    //         fetchPolicy: 'cache-and-network',
    //         variables: {
    //             orderBy: 'RATING_AVERAGE',
    //             orderDirection: 'DESC'
    //         }
    //     }))
    // } else if (selectedValue === 'lowest') {
    //     ({ data } = useQuery(GET_REPOSITORIES_BY_ORDER, {
    //         fetchPolicy: 'cache-and-network',
    //         variables: {
    //             orderBy: 'RATING_AVERAGE',
    //             orderDirection: 'ASC'
    //         }
    //     }))
    // } else return null;

    // if (loading) {
    //     return <View><Text fontSize='bold'>loading……</Text></View>
    // }

    const onEndReach = () => {
        fetchMore();
    };

    return (
        <View style={styles.view}>
        <RepositoryListContainer
            searchValue={searchQuery} setSearchQuery={setSearchQuery}
            selectedValue={selectedValue} setSelectedValue={setSelectedValue}
            repositories={data?.repositories}
            navigate={navigate}
            onEndReach={onEndReach}
        />
        </View>
    );
    //     const repositoryNodes = data.repositories ? data.repositories.edges.map(edge => edge.node) : []
    //     return (
    //         <View>
    //             <FlatList
    //                 ListHeaderComponent={
    //                 <>
    //                 {/* <TextInput placeholder='Search' onChangeText={query => setSearchQuery(query)} value={searchValue} /> */}
    //                 {/* <Searchbar placeholder='Search' onChangeText={query => setSearchQuery(query)} value={searchValue} /> */}
    //                 <SearchBarComponent searchValue={searchValue} setSearchQuery={setSearchQuery} />
    //                 <ListHeaderComponent selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
    //                 </>
    //             }
    //                 data={repositoryNodes}
    //                 ItemSeparatorComponent={ItemSeparator}
    //                 renderItem={({ item }) => <Card><Pressable onPress={() => navigate(`/${item.id}`)}><RepositoryItem item={item} /></Pressable></Card>}
    //             />
    //         </View>
    //     );
};

export class RepositoryListContainer extends Component {

    renderHeader = () => {
        const props = this.props
        return (
            <>
                {/* <Searchbar placeholder='Search' onChangeText={query => props.setSearchQuery(query)} value={props.searchValue} /> */}
                <SearchBarComponent searchValue={props.searchValue} setSearchQuery={props.setSearchQuery} />
                <ListHeaderComponent selectedValue={props.selectedValue} setSelectedValue={props.setSelectedValue} />
            </>
        )
    };

    render() {
        const props = this.props;
        const repositoryNodes = props.repositories ? props.repositories.edges.map(edge => edge.node) : []
        return (
            <FlatList
                ListHeaderComponent={this.renderHeader}
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => <Card><Pressable onPress={() => props.navigate(`/${item.id}`)}><RepositoryItem item={item} /></Pressable></Card>}
                onEndReached={props.onEndReach}
                onEndReachedThreshold={0.5}
            />
        )
    }
}

export default RepositoryList;