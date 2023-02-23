import { gql } from "@apollo/client";

export const GET_RESPOSITORIES = gql`
    query ($after: String, $first: Int, $orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
        repositories(after: $after, first: $first, orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
        totalCount
        edges {
            node {
                        id,
                        fullName,
                        stargazersCount,
                        ownerAvatarUrl,
                        forksCount,
                        reviewCount,
                        description,
                        ratingAverage,
                        language
                    }
            cursor
        }
        pageInfo {
            endCursor
            startCursor
            hasNextPage
        }
        }
    }
`

export const GET_CURRENT_USER  = gql`
    query getCurrentUser($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if:$includeReviews) {
                totalCount
                pageInfo {
                    endCursor
                    hasNextPage
                    startCursor
                }
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        repositoryId
                        user {
                            id
                            username
                        }
                    }
                    cursor
                }
            }
        }
    }
`

export const GET_RESPOSITORY_BY_ID = gql`
query ($repositoryId: ID!, $first: Int, $after: String)  {
    repository(id: $repositoryId) {
        url
        reviewCount
        fullName
        forksCount
        description
        language
        ratingAverage
        stargazersCount
        ownerAvatarUrl
        reviews(first: $first, after: $after) {
            totalCount
            pageInfo {
                endCursor
                hasNextPage
                startCursor
            }
            edges {
                node {
                    id
                    text
                    rating
                    createdAt
                    repositoryId
                    user {
                        id
                        username
                    }
                }
                cursor
            }
        }
    }
}
`

export const GET_REVIEWS_BY_ID = gql`
    query ($repositoryId: ID!, $first: Int, $after: String)  {
        repository(id: $repositoryId) {
            url
            reviewCount
            fullName
            forksCount
            description
            language
            ratingAverage
            stargazersCount
            ownerAvatarUrl
            reviews(first: $first, after: $after) {
                totalCount
                pageInfo {
                    endCursor
                    hasNextPage
                    startCursor
                }
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        repositoryId
                        user {
                            id
                            username
                        }
                    }
                    cursor
                }
            }
        }
    }
`

export const GET_REPOSITORIES_BY_ORDER = gql`
    query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
            edges {
                node {
                    id,
                    fullName,
                    stargazersCount,
                    ownerAvatarUrl,
                    forksCount,
                    reviewCount,
                    description,
                    ratingAverage,
                    language
                }
            }
        }
    }
`

export const GET_REPOSITORIES_BY_KEYWORD = gql`
    query Repositories($searchKeyword: String) {
        repositories(searchKeyword: $searchKeyword) {
            edges {
                node {
                    id,
                    fullName,
                    stargazersCount,
                    ownerAvatarUrl,
                    forksCount,
                    reviewCount,
                    description,
                    ratingAverage,
                    language
                }
            }
        }
    }
`
