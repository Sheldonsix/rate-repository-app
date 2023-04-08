import { View, StyleSheet, ScrollView } from "react-native";
import Constants from 'expo-constants';
import theme from "../theme";
import Text from "./Text";
import { Link } from 'react-router-native';
import { Platform } from "react-native";
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from "../graphql/querise";


const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.barBackgroundColor,
        flexDirection: 'row',
        alignItems: "center",
    },
    text: {
        // paddingLeft: 15,
        // paddingBottom: 15,
        padding:15,
        fontFamily: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System'
        })
    }
});

const AppBar = () => {
    const { data, loading } = useQuery(GET_CURRENT_USER);
    if (loading) {
        return (
            <View>
                <Text>Loading……</Text>
            </View>
        )
    }
    return (
        <View>
            <View style={styles.container}>
                <ScrollView horizontal>
                    <Link to="/" >
                        <Text color="barText" fontWeight="bold" fontSize="subheading" style={styles.text}>
                            Repositories
                        </Text>
                    </Link>

                    {data.me === null ?
                        <>
                            <Link to="/signin" >
                                <Text color="barText" fontWeight="bold" fontSize="subheading" style={styles.text}>
                                    Signin
                                </Text>
                            </Link>
                            <Link to="/signup" >
                                <Text color="barText" fontWeight="bold" fontSize="subheading" style={styles.text}>
                                    Signup
                                </Text>
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/createReview" >
                                <Text color="barText" fontWeight="bold" fontSize="subheading" style={styles.text}>
                                    Create a review
                                </Text>
                            </Link>
                            <Link to="/myReviews" >
                                <Text color="barText" fontWeight="bold" fontSize="subheading" style={styles.text}>
                                    My reviews
                                </Text>
                            </Link>
                            <Link to="/signout" >
                                <Text color="barText" fontWeight="bold" fontSize="subheading" style={styles.text}>
                                    Signout
                                </Text>
                            </Link>
                        </>
                    }
                </ScrollView>
            </View>
        </View>)
};

export default AppBar;