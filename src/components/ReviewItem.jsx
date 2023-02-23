import Text from "./Text";
import { StyleSheet, View } from "react-native";
import format from 'date-fns/format';


const cardHeaderStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexGrow: 1
    },
    rating: {
        paddingLeft: 7,
        paddingVertical: 7
    },
    ratingContainer: {
        width: 45,
        height: 45,
        flexGrow: 0,
        // paddingRight: 15,
        borderStyle: "solid",
        borderRadius: 90,
        borderColor: "#0366d6",
        borderWidth: 3,
    },
    infoContainer: {
        flexGrow: 1,
        paddingLeft: 15,
    }
});

const CardHeader = ({ rating, username, createdAt }) => {
    return (
        <View style={cardHeaderStyles.container}>
            <View style={cardHeaderStyles.ratingContainer} >
                <Text color="primary" fontWeight="bold" style={cardHeaderStyles.rating}>{rating}</Text>
            </View>
            <View style={cardHeaderStyles.infoContainer}>
                <Text testID="username" fontWeight="bold" fontSize="sunheading">{username}</Text>
                <Text testID="createdAt" color="textSecondary">{format(new Date(createdAt.slice(0, 10)), 'yyyy/MM/dd')}</Text>
            </View>
        </View>
    );
};

const cardBodyStyles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingLeft: 60,
        alignSelf: 'flex-start'
    },
    text: {
        backgroundColor: "#0366d6",
        borderRadius: 5,
        padding: 3
    }
});

const CardBody = ({ reviewText }) => {
    return (
        <View style={cardBodyStyles.container}>
            <Text testID="reviewText">{reviewText}</Text>
        </View>
    );
};

const cardStyles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        padding: 15
    }
});

const ReviewItem = ({ item }) => {
    return (
        <View style={cardStyles.container}>
            <CardHeader username={item.user.username} rating={item.rating} createdAt={item.createdAt} />
            <CardBody reviewText={item.text} />
        </View>
    );
};

export default ReviewItem;