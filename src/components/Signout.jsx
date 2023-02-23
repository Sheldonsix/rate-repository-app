import { Button } from "react-native-paper";
import { StyleSheet } from 'react-native';
import { useNavigate } from "react-router-dom";
import useAuthStorage from "../hooks/useAuthStorage";
import {useApolloClient} from "@apollo/client"


const styles = StyleSheet.create({
    button: {
        padding: 5,
        margin: 10,
    }
}) 


const Signout = () => {
    const navigate = useNavigate();
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const handleSignout = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        navigate('/signin');
    }
    return(
        <Button buttonColor="#d6394c" onPress={handleSignout} mode="contained" style={styles.button}>Sign Out</Button>
    )
}

export default Signout;