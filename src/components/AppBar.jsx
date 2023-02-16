import { View, StyleSheet, ScrollView } from "react-native";
import Constants from 'expo-constants';
import theme from "../theme";
import Text from "./Text";
import { Link } from 'react-router-native';
import { Platform } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.barBackgroundColor,
        flexDirection: 'row'
    },
    text: {
        paddingLeft: 15,
        paddingBottom: 15,
        fontFamily: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System'
        })
    }
});

const AppBar = () => {
    return (
        <View>
            <View style={styles.container}>
                <ScrollView horizontal>
                    <Link to="/" >
                        <Text color="barText" fontWeight="bold" fontSize="subheading" style={styles.text}>
                            Repositories
                        </Text>
                    </Link>
                    <Link to="/signin" >
                        <Text color="barText" fontWeight="bold" fontSize="subheading" style={styles.text}>
                            Signin
                        </Text>
                    </Link>
                </ScrollView>
            </View>
        </View>)
};

export default AppBar;