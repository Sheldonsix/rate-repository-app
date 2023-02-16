import Text from "./Text";
import { StyleSheet, View, Image } from "react-native";

const cardHeaderStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexGrow: 1
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 10 / 2,
    },
    avatarContainer: {
        flexGrow: 0,
        paddingRight: 15,
    },
    infoContainer: {
        flexGrow: 1
    }
});

const CardHeader = ({ imageUrl, fullName, description }) => {
    return (
        <View style={cardHeaderStyles.container}>
            <View style={cardHeaderStyles.avatarContainer} >
                <Image style={cardHeaderStyles.avatar} source={{ uri: imageUrl }} />
            </View>
            <View style={cardHeaderStyles.infoContainer}>
                <Text fontWeight="bold" fontSize="sunheading">{fullName}</Text>
                <Text color="textSecondary">{description}</Text>
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
        borderRadius: 3,
    }
})

const CardBody = ({ language }) => {
    return (
        <View style={cardBodyStyles.container}>
            <Text color="languageText" style={cardBodyStyles.text}>{language}</Text>
        </View>
    );
};

const cardFooterStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-around',
    },
    actionTouchable: {
        flexGrow: 0
    },
    textContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    }
});

const CardFooter = ({ starsCount = 0, forksCount = 0, reviewCount = 0, ratingAverage = 0 }) => {
    return (
        <View style={cardFooterStyles.container}>
            <View style={cardFooterStyles.textContainer}>
                <Text fontWeight="bold">{Math.round(+starsCount / 1000 * 10) / 10}k</Text>
                <Text color="textSecondary">
                    Stars
                </Text>
            </View>
            <View style={cardFooterStyles.textContainer}>
                <Text fontWeight="bold">{Math.round(+forksCount / 1000 * 10) / 10}k</Text>
                <Text color="textSecondary">
                    Forks
                </Text>
            </View>
            <View style={cardFooterStyles.textContainer}>
                <Text fontWeight="bold">{reviewCount}</Text>
                <Text color="textSecondary">
                    Reviews
                </Text>
            </View>
            <View style={cardFooterStyles.textContainer}>
                <Text fontWeight="bold">{ratingAverage}</Text>
                <Text color="textSecondary">
                    Rating
                </Text>
            </View>
            {/* <Text style={cardFooterStyles.actionText} color="textSecondary">Forks</Text>
            <Text style={cardFooterStyles.actionText} color="textSecondary">Reviews</Text>
            <Text style={cardFooterStyles.actionText} color="textSecondary">Rating</Text> */}
        </View>
    )
}

const cardStyles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        padding: 15

    }
});

const Card = ({ item }) => {
    return (
        <View style={cardStyles.container}>
            <CardHeader fullName={item.fullName} imageUrl={item.ownerAvatarUrl} description={item.description} />
            <CardBody language={item.language} />
            <CardFooter starsCount={item.stargazersCount} forksCount={item.forksCount} reviewCount={item.reviewCount} ratingAverage={item.ratingAverage} />
        </View>
    );
};

export default Card;