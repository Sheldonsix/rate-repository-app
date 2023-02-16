import theme from "../theme";

import { Text as NativeText, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal
    },
    colorTextSecondary: {
        color: theme.colors.textSecondary
    },
    colorPrimary: {
        color: theme.colors.primary
    },
    colorBarText: {
        color: theme.colors.barTextColor
    },
    colorLanguageText: {
        color: theme.colors.languageTextColor
    },
    colorLanguageBackground: {
        backgroundColor: theme.colors.languageBackgroundColor
    },
    fontSizeSubheading: {
        fontSize: theme.fontSizes.subheading,
    },
    fontWeightBold: {
        fontWeight: theme.fontWeights.bold,
    },
});

const Text = ({color, fontSize, fontWeight, style, ...props}) => {
    const textStyle = [
        styles.text,
        color === 'textSecondary' && styles.colorTextSecondary,
        color === 'primary' && styles.colorPrimary,
        color === 'barText' && styles.colorBarText,
        color === 'languageText' && styles.colorLanguageText,
        fontSize === 'subheading' && styles.fontSizeSubheading,
        fontWeight === 'bold' && styles.fontWeightBold,
        style
    ];

    return <NativeText style={textStyle} {...props} />
};

export default Text;