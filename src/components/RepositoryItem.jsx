import { View, StyleSheet} from "react-native"
import Card from "./Card";


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
});

const RepositoryItem = ({item}) => {
    
    return(
    <View testID="repositoryItem" style={styles.container}>
        <Card item={item}  />
    </View>)
};

export default RepositoryItem;