import { gql } from "@apollo/client"
export const GET_RESPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
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

export const ME = gql`
    query {
        me {
            id
            username
        }
    }
`